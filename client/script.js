// Initialize company, department, and specialization dropdowns and the colleagues table
const companySelect = document.getElementById('companySelect');
const departmentSelect = document.getElementById('departmentSelect');
const specializationSelect = document.getElementById('specializationSelect');
const specializationsTable = document.getElementById('specializationsTable');
const tableBody = specializationsTable.querySelector('tbody');
const loadingElement = document.getElementById('loading'); // Loading indicator element

let companies = []; // Global variable to store fetched companies data

// Fetch companies data from backend
async function fetchCompanies() {
  loadingElement.style.display = 'block'; // Show loading message

  try {
    const response = await fetch('http://localhost:3000/companies'); // Backend API URL
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    companies = await response.json();
    populateCompanyDropdown(companies);
    showAllColleagues(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    alert('Failed to load company data. Please try again later.');
  } finally {
    loadingElement.style.display = 'none'; // Hide loading message
  }
}

// Populate the company dropdown with company names
function populateCompanyDropdown(companies) {
  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company.id;
    option.textContent = company.name;
    companySelect.appendChild(option);
  });
}

// Function to render colleagues in the table with row numbers
function renderColleagues(colleagues) {
  tableBody.innerHTML = ''; // Clear the table before rendering
  colleagues.forEach((colleague, index) => {
    const row = document.createElement('tr');

    // Add the row number (1-based index)
    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1; // Row number
    row.appendChild(indexCell);

    // Add name, email, and age columns
    const nameCell = document.createElement('td');
    nameCell.textContent = colleague.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = colleague.email;
    row.appendChild(emailCell);

    const ageCell = document.createElement('td');
    ageCell.textContent = colleague.age;
    row.appendChild(ageCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
  specializationsTable.style.display = 'table'; // Make sure the table is displayed
}

// Get all colleagues for all specializations in given departments
function getSpecializationColleagues(departments) {
  let colleagues = [];
  departments.forEach(department => {
    department.specializations.forEach(specialization => {
      colleagues = colleagues.concat(specialization.colleagues);
    });
  });
  return colleagues;
}

// Get all colleagues for a specific department
function getDepartmentColleagues(department) {
  let colleagues = [];
  department.specializations.forEach(specialization => {
    colleagues = colleagues.concat(specialization.colleagues);
  });
  return colleagues;
}

// Display all colleagues across all companies on page load
function showAllColleagues(companies) {
  let allColleagues = [];
  companies.forEach(company => {
    allColleagues = allColleagues.concat(getSpecializationColleagues(company.departments));
  });
  renderColleagues(allColleagues);
}

// Handle company selection
companySelect.addEventListener('change', function () {
  const selectedCompany = companies.find(company => company.id == companySelect.value);

  // Clear department and specialization dropdowns and disable them initially
  departmentSelect.innerHTML = '<option value="">Select Department</option>';
  specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
  departmentSelect.disabled = true;
  specializationSelect.disabled = true;

  if (selectedCompany) {
    // Enable department dropdown and populate it with departments
    departmentSelect.disabled = false;
    selectedCompany.departments.forEach(department => {
      const option = document.createElement('option');
      option.value = department.id;
      option.textContent = department.name;
      departmentSelect.appendChild(option);
    });

    // Display all colleagues from the selected company
    const companyColleagues = getSpecializationColleagues(selectedCompany.departments);
    renderColleagues(companyColleagues);
  } else {
    // If no company is selected, show all colleagues
    showAllColleagues(companies);
  }
});

// Handle department selection
departmentSelect.addEventListener('change', function () {
  const selectedCompany = companies.find(company => company.id == companySelect.value);
  const selectedDepartment = selectedCompany?.departments.find(department => department.id == departmentSelect.value);

  // Clear and disable specialization dropdown initially
  specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
  specializationSelect.disabled = true;

  if (selectedDepartment) {
    // Enable specialization dropdown and populate it with specializations
    specializationSelect.disabled = false;
    selectedDepartment.specializations.forEach(specialization => {
      const option = document.createElement('option');
      option.value = specialization.id;
      option.textContent = specialization.name;
      specializationSelect.appendChild(option);
    });

    // Display all colleagues from the selected department
    const departmentColleagues = getDepartmentColleagues(selectedDepartment);
    renderColleagues(departmentColleagues);
  } else {
    // If no department is selected, show colleagues for the selected company
    const companyColleagues = getSpecializationColleagues(selectedCompany.departments);
    renderColleagues(companyColleagues);
  }
});

// Handle specialization selection
specializationSelect.addEventListener('change', function () {
  const selectedCompany = companies.find(company => company.id == companySelect.value);
  const selectedDepartment = selectedCompany?.departments.find(department => department.id == departmentSelect.value);
  const selectedSpecialization = selectedDepartment?.specializations.find(specialization => specialization.id == specializationSelect.value);

  if (selectedSpecialization) {
    // Display colleagues of the selected specialization
    renderColleagues(selectedSpecialization.colleagues);
  } else if (selectedDepartment) {
    // If no specialization selected, show all colleagues in the department
    const departmentColleagues = getDepartmentColleagues(selectedDepartment);
    renderColleagues(departmentColleagues);
  } else {
    // If no department selected, show all colleagues in the company
    const companyColleagues = getSpecializationColleagues(selectedCompany.departments);
    renderColleagues(companyColleagues);
  }
});

// Fetch companies and display colleagues when the page loads
fetchCompanies();

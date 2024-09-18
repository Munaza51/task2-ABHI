const express = require('express');
const app = express();
const port = 3000;

// Enable CORS for communication with the frontend (if your frontend is hosted elsewhere)
const cors = require('cors');
app.use(cors());

// Mock data: Same structure as the companies array you were using in the frontend
const companies = [
    {
      id: 1,
      name: "Google",
      departments: [
        {
          id: 1,
          name: "AI and Machine Learning",
          specializations: [
            {
              id: 1,
              name: "Natural Language Processing (NLP)",
              colleagues: [
                { id: 1, name: "John Doe", email: "johndoe@google.com", age: 28 },
                { id: 2, name: "Sara Lee", email: "saralee@google.com", age: 27 },
                { id: 3, name: "Alex Brown", email: "alexbrown@google.com", age: 29 }
              ]
            },
            {
              id: 2,
              name: "Computer Vision",
              colleagues: [
                { id: 4, name: "Chris Evans", email: "chrisevans@google.com", age: 30 },
                { id: 5, name: "Anna Taylor", email: "annataylor@google.com", age: 25 }
              ]
            },
            {
              id: 3,
              name: "Reinforcement Learning (RL)",
              colleagues: [
                { id: 6, name: "Olivia Adams", email: "oliviaadams@google.com", age: 26 },
                { id: 7, name: "Mason Clark", email: "masonclark@google.com", age: 27 }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "Cloud Computing",
          specializations: [
            {
              id: 4,
              name: "Cloud Infrastructure",
              colleagues: [
                { id: 8, name: "Henry Wilson", email: "henrywilson@google.com", age: 32 },
                { id: 9, name: "Sophia Martinez", email: "sophiamartinez@google.com", age: 31 }
              ]
            },
            {
              id: 5,
              name: "Cloud Security",
              colleagues: [
                { id: 10, name: "Emma Lopez", email: "emmalopez@google.com", age: 29 },
                { id: 11, name: "James Hill", email: "jameshill@google.com", age: 28 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Microsoft",
      departments: [
        {
          id: 3,
          name: "Productivity and Business Processes",
          specializations: [
            {
              id: 6,
              name: "Microsoft Office Suite",
              colleagues: [
                { id: 12, name: "Lucas Green", email: "lucasgreen@microsoft.com", age: 33 },
                { id: 13, name: "Ava White", email: "avawhite@microsoft.com", age: 30 }
              ]
            },
            {
              id: 7,
              name: "Business Solutions",
              colleagues: [
                { id: 14, name: "Daniel Hall", email: "danielhall@microsoft.com", age: 34 },
                { id: 15, name: "Zoe King", email: "zoeking@microsoft.com", age: 29 }
              ]
            },
            {
              id: 8,
              name: "Enterprise Services",
              colleagues: [
                { id: 16, name: "Jack Scott", email: "jackscott@microsoft.com", age: 31 },
                { id: 17, name: "Amelia Perez", email: "ameliaperez@microsoft.com", age: 28 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Amazon",
      departments: [
        {
          id: 4,
          name: "AWS (Amazon Web Services)",
          specializations: [
            {
              id: 9,
              name: "Web Devlopment",
              colleagues: [
                { id: 18, name: "Noah Baker", email: "noahbaker@amazon.com", age: 32 },
                { id: 19, name: "Ella Edwards", email: "ellaedwards@amazon.com", age: 30 }
              ]
            },
            {
              id: 10,
              name: "App Devlopment",
              colleagues: [
                { id: 20, name: "Liam Carter", email: "liamcarter@amazon.com", age: 28 },
                { id: 21, name: "Charlotte Miller", email: "charlottemiller@amazon.com", age: 27 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Apple",
      departments: [
        {
          id: 5,
          name: "iOS Development",
          specializations: [
            {
              id: 11,
              name: "Web Devlopment",
              colleagues: [
                { id: 22, name: "William Turner", email: "williamturner@apple.com", age: 29 },
                { id: 23, name: "Mia Stewart", email: "miastewart@apple.com", age: 27 }
              ]
            },
            {
              id: 12,
              name: "App Devlopment",
              colleagues: [
                { id: 24, name: "Emily Barnes", email: "emilybarnes@apple.com", age: 28 },
                { id: 25, name: "Benjamin Russell", email: "benjaminrussell@apple.com", age: 30 }
              ]
            }
          ]
        }
      ]
    }
  ];

// Define an endpoint that sends the companies data
app.get('/companies', (req, res) => {
  res.json(companies);
});

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
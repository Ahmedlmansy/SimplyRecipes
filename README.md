SimplyRecipes

Overview

SimplyRecipes is a modern recipe web application that allows users to explore a variety of recipes dynamically fetched from an API. Originally built with HTML, CSS, and basic JavaScript, the project was transformed into a fully functional React application using Vite, featuring a responsive design and a user-friendly interface.

Features





Browse a wide range of recipes with detailed information (title, image, ingredients, instructions).



Dynamic data fetching using the Spoonacular API for real-time recipe updates.



Responsive design compatible with mobile, tablet, and desktop devices.



Seamless navigation between pages (Home, Recipes, About, Contact) using React Router.



Modern UI with reusable React components (Header, Footer, TagsComponent).

Technologies Used





React: For building interactive UI components.



Vite: For a fast development and build environment.



JavaScript: Core programming language.



REST API (Spoonacular): For fetching recipe data.



Git: Version control.



Netlify/Vercel: Deployment platforms.

Installation

To run the project locally, follow these steps:





Clone the repository:

git clone https://github.com/Ahmed1mansy/SimplyRecipes-.git
cd SimplyRecipes-



Install dependencies:

npm install



Set up environment variables:





Create a .env file in the root directory.



Add your Spoonacular API key:

VITE_API_KEY=your-api-key-here
VITE_API_URL=https://api.spoonacular.com

Usage





Run the development server:

npm run dev





Open http://localhost:5173 in your browser to view the app.



Build the project for production:

npm run build



Preview the production build:

npm run preview

Deployment

The project is deployed on Netlify/Vercel. To deploy your own version:





Build the project:

npm run build



Deploy the dist folder to your preferred platform (e.g., Netlify, Vercel).



Add the VITE_API_KEY as an environment variable in your deployment platform settings.

Live Demo





Live Demo

Contributing

Contributions are welcome! Please follow these steps:





Fork the repository.



Create a new branch (git checkout -b feature/your-feature).



Commit your changes (git commit -m "Add your feature").



Push to the branch (git push origin feature/your-feature).



Open a pull request.

License

This project is licensed under the MIT License.

Contact

For any inquiries, feel free to reach out:





GitHub: Ahmed1mansy

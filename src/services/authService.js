// src/services/authService.js
// Store users in localStorage to make it persistent
const getUsers = () => {
    const storedUsers = localStorage.getItem('mockUsers');
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, username: 'user1', password: 'password1' },
      { id: 2, username: 'user2', password: 'password2' }
    ];
  };
  
  // Register new user
  export const register = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        if (users.some(u => u.username === username)) {
          reject(new Error('Username already exists'));
          return;
        }
        
        const newUser = {
          id: users.length + 1,
          username,
          password
        };
        
        localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));
        resolve(newUser);
      }, 500);
    });
  };
  
  // Login user
  export const login = (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(
          u => u.username === credentials.username && 
               u.password === credentials.password
        );
        
        if (user) {
          // Store current user in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };
  
  // Logout user
  export const logout = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        resolve();
      }, 300);
    });
  };
  
  // Get current user
  export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  };
# Exploring Frontend Architecture
This is a small frontend application that was built to explore different variations of frontend architecture.
[Mock Service Worker](https://github.com/mswjs) with its [Data](https://github.com/mswjs/data) extension are used to mock API calls. MSW is pretty neat!

<img width="1016" alt="Screenshot 2023-06-26 at 7 31 00 PM" src="https://github.com/efuller/exploring-frontend-architecture/assets/4174472/86f45d92-1357-4942-9ef2-daf61a664037">

## Functionality
- A user can add their favorite foods to a list
- A user can delete a food from the list
- A user can favorite a food item
- Favorites are saved to local storage so they are persistent on page reloads
- When a favorite is deleted, the user will have to confirm deletion

## Issues
- [ ] The favorite button doesn't turn red until after a reload 😤

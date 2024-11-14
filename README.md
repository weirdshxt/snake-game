# Snake Game

A classic Snake game implemented in JavaScript with additional features like difficulty progression, high score tracking, and a loading animation. Developed by Kabir Khan.

## Developer

This game was created by Kabir Khan, a passionate developer with a keen interest in web-based game development. Kabir has implemented various features to enhance the classic Snake game experience, including progressive difficulty, score tracking, and engaging animations.

## Features

- Classic Snake gameplay
- Responsive controls using arrow keys
- Score tracking
- High score saving using local storage
- Increasing difficulty as the game progresses
- Game over screen with restart option
- Loading animation using GSAP

## How to Play

1. Open the `index.html` file in a web browser.
2. Wait for the loading animation to complete.
3. Use the arrow keys to control the snake:
   - Up Arrow: Move Up
   - Down Arrow: Move Down
   - Left Arrow: Move Left
   - Right Arrow: Move Right
4. Eat the food to grow the snake and increase your score.
5. Avoid colliding with the walls or the snake's own body.
6. The game gets faster every 5 points, increasing the difficulty.
7. When the game ends, you can restart by clicking the "Restart" button.

## Technical Details

- The game is built using vanilla JavaScript.
- GSAP (GreenSock Animation Platform) is used for the loading animation.
- The game loop uses `requestAnimationFrame` for smooth rendering.
- Audio effects are implemented for eating food, moving, and game over events.

## File Structure

- `index.html`: The main HTML file
- `app.js`: The JavaScript file containing the game logic
- `style.css`: The CSS file for styling
- `assets/`: Directory containing audio files for game sounds

## Customization

You can customize various aspects of the game by modifying the following variables in `app.js`:

- `speed`: Initial game speed
- `difficultyLevel`: Starting difficulty level
- `snakeHead`: Initial position of the snake
- `food`: Initial position of the food

## Future Improvements

Kabir Khan is considering the following improvements for future versions:

- Add mobile touch controls
- Implement different game modes
- Add power-ups and obstacles
- Create a leaderboard system

## Contact the Developer

If you have any questions, suggestions, or just want to connect with Kabir Khan, you can reach out through:

Github: https://github.com/@weirdshxt
Instagram: https://www.instagram/@weirdsht
Email: weirdsht@yahoo.com

## Credits

This game was created by Kabir Khan. Feel free to use, modify, and distribute the code as per the license terms.

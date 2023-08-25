## 25+5 Clock

This project involves building an interactive timer application that allows users to set both a session length and a break length. The timer alternates between these two phases, counting down from the session length and then the break length, while providing a visual display of the time remaining. The timer follows the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) for time management.

### Project Description

The 25+5 Clock is a timer application built using React and Redux that helps users manage their time efficiently through session and break intervals. The application displays the remaining time in mm:ss format, allowing users to customize the session and break lengths. The timer can be started and paused, and a reset option is available to restore default settings.

### Challenge Requirement

The challenge required building an app similar to [this example](https://25--5-clock.freecodecamp.rocks). The following user stories were fulfilled:

1. Display elements indicating the session and break lengths.
2. Buttons to increment and decrement both session and break lengths.
3. Display the timer label ("Session" or "Break").
4. Display the timer countdown in mm:ss format.
5. Buttons to start/pause the timer and to reset the timer.
6. Audio notification when the timer reaches zero.
7. The ability to pause the timer and then resume where it left off.
8. The timer to transition between session and break phases automatically.

### Implementation Details

The project is built using React and Redux, enabling efficient state management and reactivity. The countdown timer is implemented using Redux actions and interval updates. Users can customize the session and break lengths within predefined limits. When the timer reaches zero, an audio notification plays, and the timer transitions between session and break phases seamlessly.

### Technologies Used

- React
- Redux
- Bootstrap (for styling)
- Font Awesome (for icons)

### Example

[Clock 25+5](https://github.com/rijadhmz/Clock-25-plus-5/blob/secondary/images/example.png?raw=true)

### Project URL

To interact with the deployed project, visit my [Codepen Project](https://codepen.io/rijadhmz/pen/rNQoeWQ).

This project showcases the integration of React and Redux to create a timer application that helps users manage their time effectively using the Pomodoro Technique. It offers customizable session and break lengths, audio notifications, and automatic phase transitions.

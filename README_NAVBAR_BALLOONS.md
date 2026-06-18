This file documents the navbar balloons behavior added to `story.js` and `style.css`.

- createNavbarBalloons(duration)
  - Appends `.navbar-balloons` container to `header.sticky-nav`.
  - Creates a number of `.navbar-balloon` elements with randomized sizes, positions, speeds.
  - Balloons animate with `@keyframes navFloat` and run infinitely until the container is removed.
  - Default duration is 30000 ms (30s). The container fades out and is removed after duration.

- Styling: `.navbar-balloons` and `.navbar-balloon` are defined in `style.css`.

If you want the balloons to run indefinitely, call `createNavbarBalloons(0)` and remove the timeout logic, or pass a very large duration.

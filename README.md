# React Metronome

This project can be viewed [here](https://njmyers.github.io/react-metronome/)

As someone with a long history and background in music I've always been in search of better digital metronomes. Something about the simplicity of a quartz crystal metronome or a mechanical metronome always struck me as the right type of regularity. Some digital metronomes leave me wanting more because of the type of regularity. It's about precision but also about feel. This project will hopefully reflect that and also will help me learn React!

## Technical Explanation

Reading time passed from `new Date()` gives quite a range of differences in the alotted time passed. For this project I set a 'framerate' so that the animations and also the sounds are all measured from the same `setInterval`. With a 'framerate' of 4 these incremental additions of time passed add up to the fact that the metronome hardly ever calculates the exact amount of expired time before the next beat. Consider the code below example.

```JavaScript
let goal = 1000; // ms needed to pass for 60 BPM
let oldDate = new Date();
let counter = 0; // time expired in ms

setInterval(function() {
  let newDate = new Date();
  let difference = newDate - oldDate;
  counter += difference;
}, 4)
```
Some time will pass and we will reach these states

```JavaScript
// interval x 
// counter = 9988;
let difference = 4;
counter += difference; // counter = 9992

// interval x + 1
// counter = 9992;
let difference = 5;
counter += difference; // counter = 9997

// interval x + 2
// counter = 9997;
let difference = 7;
counter += difference; // counter = 1004
```
Now should the metronome tick at round 2 or at round 3? At round 2 it will be ahead and at round 3 it will be behind in terms of precision. The implementation of a tolerance (ms) means that the metronome can be configured to prefer earlier or later. At tolerance of 4ms the metronome ticks on round 2 and at a lower tolerance would tick on round 3.

For some musicians a metronome that 'rushes' is preferable to one that 'drags'. Of course the metronome dragging and rushing has inspired many music jokes but in this instances they are actually correct. This metronome allows the user to choose.

A higher tolerance will result in a faster metronome and a lower tolerance will result in a slower metronome. Personally I need it bothe ways depending on the style of music I am playing!
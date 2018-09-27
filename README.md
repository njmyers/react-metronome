# Metronome

## Inspiration

For a long time I've been frustrated by digital metronomes. They are usually quite imprecise timekeepers when compared with the regularity of a nice [quartz crystal](https://www.samash.com/matrix-mr500-compact-quartz-metronome-mmr500). They also lack the charm associated with an old school [wind-up version](https://en.wikipedia.org/wiki/Metronome). This project is an attempt to bridge the gap and give the digital metronome some of the qualities of their real-world equivalents.

## Technical Explanantion

### Loops

Upon investigation into the timekeeping of metronomes, I found that most metronomes are using some derivative of the javascript method setInterval, or setTimeout. They are also using in a quite simplistic way and are not accounting for the fact that [setInterval does not really keep time](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified). The only thing setInterval does is delay execution of code. It is imperative when designing a timekeeper in javascript that we use a method which actually will keep the time for us. The method that I have chosen to keep time in this project is the [performance object](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now). This will give us a higher resolution of timekeeping (depending on browser security settings) when compared with the Date.now() method or even worse a simple setInterval.

Using the performance timestamp we can store references to the time at the last interval of code execution. When a new interval of code execution happens we can then calculate the precise amount of time that has passed and avoid any sort of time synchronization that comes from the date object. After calculation we can add the precise amount of time from our interval to the previous tally of time and determine with greater accuracy when our specific metronome beat should occur.

### Audio Scheduling

And now for the next part! We have to schedule our audio. We cannot rely on our next interval in order to schedule the click of our audio. Even though we know precisely what time it is, if we call setTimeout again we have no idea of knowing when our next code execution will happen. For our browser and desktop versions we can now use the awesome [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
Reading through the API specification you can be sure it was designed with professional audio applications in mind. I've spent a lot of time in my life working with Logic and ProTools (professional desktop audio applications) so I was relieved when I read these words,

> Timing is controlled with high precision and low latency, allowing developers to write code that responds accurately to events and is able to target specific samples, even at a high sample rate. So applications such as drum machines and sequencers are well within reach.

Anyone who is familiar with digital audio will know how the word 'latency' can strike fear into the hearts of anybody who is trying to interface a live instrument with computers. Luckily in this application our metronome works flawlessly allowing the API to schedule with high precision exactly when our audio events should occur. The API allows access to your computer's audio clock. Please correct me if I am wrong, but if you are using an outboard audio interface like myself then you are effectively letting your web app use the clock from your gear. Awesome!

## Conclusion

[Try the metronome here](https://react-metronome.netlify.com/) and let me know what you think. I will be adding new features soon including more sounds (from real instruments!) as well as subdivisions for quarter notes. That is for all of the drummers out there :)

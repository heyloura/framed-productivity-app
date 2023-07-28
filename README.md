# The Framed* Framework 
This is a personal experiment in using iframes to make a strange sort-of web-framework. The iframes are loaded into the DOM and then removed. Script tags are preserved and executed and the CSS has primitive scoping. All in two tiny JavaScript files (see the scripts folder). This allows you to write html fragments and import them. No other dependencies and no build step. I was hoping to make something more friendly to beginner web developers just getting started with JavaScript, CSS, and HTML then modern webcomponents or some other frameworks.

Another bonus: If your fragments don't need JavaScript then the iframe offers a convienent noJS default experience.

[Demo](https://heyloura.github.io/framed-productivity-app/index.html)

Check out the fragments folder. There is just something nice about keeping the CSS, JavaScript, and HTML together.

# Simple Productivity App
A simple productivity app can be boiled down to a todo list and a calendar. This sample app is local only with offline support. You can export data and import it. This app is meant to test the idea of the framed* framework and is not meant to be a production ready calendar/todo list. Use at your own risk.

# Known Limitations
- While I've tested nesting the fragments, I haven't tested deeply nested fragments.
- The app uses an anchor tag to export the data. I'm sure there is some browser dependent limit to how big the string could get.
- While you can put custom attributes starting with `data-` on the iframe and it will make them available, I haven't really tested out this functionality.
- No templating.

mentions
========

Have you ever built a web 2.0 project that involved a textarea where users could "ping" or "tag" each other using the @username syntax? If so, you'll have enviously looked at Twitter and noticed that their implementation involves an Ajax dropdown menu showing all the available usernames that you can ping. This dropdown updates in real time with each keystroke, similarly to how Google's instant search results change with every keystroke. 

This ability to quickly find who you're trying to ping is addictive, but heretofore there hasn't been an open source project that I've seen addressing this. Sure, there are "autofill" applications that will populate a simple input box, but these projects' GUIs are horrible and they don't have the robust features that a standard textarea must be able to support.

## Unparalleled User Experience

Early in this project's development, I discovered something simple. Twitter's dropdown GUI is very similar to Chrome's autofill dropdown GUI — so much so, that I daresay they stole it directly. Let's look at the features that define this experience:

1. The items are white, with a blue enclosing border around each of them.
2. When hovering or arrowing down on a particular item in the menu, the background color changes to a flagrant blue, while the text color changes to white
3. There's a lovely curved border around the box as a unit.
4. The box extends the width of the textarea — no more and no less — and it appears at the very bottom of the textarea, overlapping anything below the textarea using absolute positioning. 

While I like Chrome's autofill dropdown GUI and used it as the template for this project, I feel that it lacks key design in several ways:

- Chrome's autofill has no curve around its border
- It has no light grey line distinguishing each row
- There is insufficient left padding between the dropdown and the justified text

The most glaring difference between Chrome's autofill and this project, of course, is that __Mentions__ is built for multiline textareas, a form control which Chrome's autofill does not support. 

## Implementation

To implement __Mentions__ on your project, you'll need to do 3 things:

1. Update your DOM structure to include the hidden `<div>` tag directly underneath the textarea, as well as the surrounding `<div>` tag that encapsulates the textarea and stated `<div>` tag.
2. Update the Ajax.php file so include your custom SQL query. If you're using PHP, the documentation and even sample code is already spelled out for you on that page. If you're using a language other than PHP, rename the file extension and update the code appropriately. Be sure to also rename the Ajax URL inside the js/app.js file.
3. Include the CSS and Javascript files inside your `<header>` tag within the DOM.

## Tech Specs

- Supports arrowing down between the menu items and hitting `Enter` to select a particular item.
- Supports a dynamically-sized textarea using Moore's Autosize plugin. This functionality is not a core part of the project, but (1) I love this plugin and use it on all my projects anyway (2) it demonstrates that the dropdown menu will hug the bottom of the textarea even if the textarea has a dynamic height.

## This application isn't set in stone!

__Mentions__ is an ongoing project, and it needs your help. Feel free to fork, modify, and pull this project for a more polished user experience and to work out any bugs you might encounter.


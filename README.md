*******************
**Initial Setup**
*******************

Getting setup locally takes less than 5 minutes!

Requirements:
- Node.js version 20+ (check with: node -v)
- Yarn package manager (install with: npm install -g yarn)

*******************

1. Open a terminal and clone the repo:

```
git clone https://github.com/11x-dev/avatar-name-enhancement.git
```

2. Navigate to the root of the project:

```
cd avatar-name-enhancement
```

3. Open the project in your IDE, then return to your original terminal for step 4:

```
code .
```

4. Install packages and start the frontend server:

```
yarn install && npm run dev
```

5. View the website in your browser:

```
http://localhost:18888/
```

************************
**Estimated Time**
************************

Estimated time for this enhancement is 1 - 1.5 hours.

************************
**Hints and Solution**
************************

If you need a hint or want to see a possible solution, navigate to this document [here](/Hints-And-Solution.md)

************************
**Coding Challenge**
************************

The real codebase uses a submodule that is located at online-go.com, which includes another submodule at online-go.com/submodules/goban. To ensure nothing breaks when those submodules are updated, the code has been manually added. The main online-go.com submodule can be found at https://github.com/online-go/online-go.com

You've been asked to automatically adjust the user's avatar name whenever they select a different alien type, but not when they select a different variant of the same alien.  The backend request to change the avatar name is already completed for you.  You do not have access to any backend code.  

**********************
**Requirements**
**********************

1. Clicking a different alien (which changes the background planet) also updates the user's avatar name
2. Clicking the left and right arrows to adjust variations of the alien do NOT change the avatar name
3. There are no side effects:

a) The avatar name should NOT rapidly change before settling on the final name

b) Clicking the "Change Name" button still properly changes the avatar name

c) Refreshing the browser page keeps the last selected avatar name and character

![Character selection page screenshot](https://res.cloudinary.com/dxq77puhi/image/upload/v1749704526/Annotated_avatar_name_screenshot_11xdev_6_11_2025_fpgape.png)

************************
**Relevant Code and Information**
************************

The file you'll want to modify is: 

```
src/views/CharacterSelection/CharacterSelection.tsx
```

In your browser, you'll want to test your changes on this page: 

```
http://localhost:18888/character-selection
```

This challenge is based on a real enhancement from a production codebase.  Feel free to use any resources you like while solving it.

Enjoyed the challenge? Give this repo a ⭐️ to help others find it too!
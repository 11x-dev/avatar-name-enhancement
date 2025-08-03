# Development Environment

Getting setup is easy, you'll need to have [node.js](https://nodejs.org/) installed (version 20+),
then clone your forked repository with the submodules.  Replace the github section below with your own forked repo. It should look something like this:

```
git clone --recurse-submodules https://github.com/ScriabinOp8No12/kidsgoserver.git
```

Then navigate to your project, and install the packages:

```
cd kidsgoserver
```

```
# You only need to run this the first time
sudo npm install -g yarn
yarn install

# Run this to start the development server and build system
npm run dev
```

If you're on linux, you can simply type `make` and it will do all this for you as well.

Once running, you can then navigate to http://localhost:18888/ which connects to the beta server for testing.

## Getting Started

-   Sign up for a [GitHub account](https://github.com/signup/free).
-   Search the [issue tracker](https://github.com/online-go/kidsgoserver.com/issues) to see if the problem is already submitted or the request for an enhancement exists.
-   Submit an issue if one does not exist. Please include as much of the below information as possible:
    -   A clear summary.
    -   Operating System tested on.
    -   Browser used when bug appeared (or multiple browsers if you have replicated the bug.)
    -   Browser version.
    -   Steps to reproduce the issue.
    -   Any additional information that you might think is useful.

## How to Make Changes

1. [Fork the repository](https://help.github.com/articles/fork-a-repo/).
    - If you haven't done so, [set up git](https://help.github.com/articles/set-up-git/).
2. Clone the repository to your computer. (Found in step 2 of "keeping your fork synced" in the fork a repo help article.)
    - To ensure you track the latest updates, you will want to configure git to sync your fork with the original online-go repository. (See step 3 in the same article.)
3. [Create a branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/) on your local machine. Name it something that makes sense for your updates.
    - This could also be done from the [git bash command line](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).
    - If you used the first method, you will need to ensure you [pull down your project's remote branches](https://stackify.com/git-checkout-remote-branch/).
4. Make the desired changes in the code or documentation.
5. [Add, commit, and push](https://help.github.com/articles/adding-a-file-to-a-repository-using-the-command-line/) your changes to your forked repository.

## How to Submit Changes

1. Navigate to the branch you created in your forked repository on github.
2. Select [`New Pull Request`](https://help.github.com/articles/creating-a-pull-request/).
3. Write an appropriate title and comment for the proposed updates.
4. Create the pull request.

## Technologies Utilized

This project is largely built with Typescript and React. If you are unfamiliar with these, please take a few minutes to familiarize yourself.

-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)

## Important Information regarding Codebase (May 2025)

Puzzles.tsx is very similar to the Lesson.tsx file.  I chose to duplicate most of the code, since there were some major differences and it's easier to maintain when they are separate components.

As a result, most of the CSS styling from the Puzzles.tsx file still uses the same classnames, which are in the Lessons.styl file.  It does have some styling of it's own, which are in Puzzles.styl file.

Lesson 8 is the section with 100 puzzles, it contains different navigation logic since the URL pattern is different from the other 7 lessons. Because of this, the back button logic when leaving lesson 8 is a little hacky as it hard codes in navigating back to /learn-to-play/7/19.  So if we add or remove any pages from lesson 7, we need to modify this hard coded value inside the Puzzles.tsx file. 

There's a hacky fix for not showing numbers on the stones when they are placed on the Go board for the 8 lessons. This is inside the configure-goban.ts file, in the getShowVariationMoveNumbers method.  We check the url pattern for "learn-to-play", then return false for the getShowVariationMoveNumbers method, which properly omits the numbering on the stones.  

You can likely create puzzles faster if you show the coordinates on the Go board. To do so, you can change the boolean value from false to true for the following values inside the Puzzles.tsx and/or the Lesson.tsx file:                 

```
draw_top_labels: false,
draw_right_labels: false,
draw_left_labels: false,
draw_bottom_labels: false,
```

# IPFS-JS Proto

This repo tests the ability to upload an image or plain text file to IPFS and read the contents back to the browser. It implements the [IPFS-JS React Starter](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/browser-create-react-app)

## Table of Contents


- Look into other [examples](https://github.com/ipfs-examples/js-ipfs-examples) to learn how to spawn an IPFS node in Node.js and in the Browser
- Consult the [Core API docs](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api) to see what you can do with an IPFS node
- Visit https://dweb-primer.ipfs.io to learn about IPFS and the concepts that underpin it
- Head over to https://proto.school to take interactive tutorials that cover core IPFS APIs
- Check out https://docs.ipfs.io for tips, how-tos and more
- See https://blog.ipfs.io for news and more
- Need help? Please ask 'How do I?' questions on https://discuss.ipfs.io



### Installation and Running example

```console
> npm install
> npm start
```

Now open your browser at `http://localhost:3000`

### Available Scripts from create-react-app

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed! Read how to host a [single page](https://docs.ipfs.io/how-to/websites-on-ipfs/single-page-website/) or an [entire website](https://docs.ipfs.io/how-to/websites-on-ipfs/multipage-website/#prerequisites) on IPFS.

But with modern hosting services like Heroku, Netlity or Fleek, you can skip the build because they will do a complete github deployment for you. See the React official page about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

This is a minimal demonstration of how to use `js-ipfs` in a `create-react-app` generated app.

It boots up a `js-ipfs` instance (an IPFS node) via a custom React hook in `./src/hooks/use-ipfs-factory.js`, which is called from `./src/App.js`. Once the IPFS node is set up, `./src/App.js` displays the [PeerId](https://docs.libp2p.io/concepts/peer-id/) of this node and the version number of `js-ipfs` used to spawn it.

All React applications store their main logic in `App.js`:

- `App.js` renders the cosmetics of the demo and calls `useIpfs` to retrieve the `id` of the node
- `useIpfsFactory.js` initialises and closes the IPFS local node
- `useIpfs.js` does the actual calls to IPFS to retrieve the property specified in argument (here the retrieved property is `id`, requested from `App.js`)


**Note**: this example is useful to learn how to spawn IPFS from a web page. It is also possible to [spawn an IPFS daemon from the command line](https://docs.ipfs.io/install/command-line/) with `ipfs daemon`.
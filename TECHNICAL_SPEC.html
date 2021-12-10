<html>

<head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">
</head>

<body>
        <h1 id="h.ex6bojz1pzgd"><span>Devote Technical Specification</span></h1>
        <h2 id="h.dhhweuoswi7r"><span></span></h2>
        <hr style="page-break-before:always;display:none;">
        <h2 id="h.ucd6ta5z1qhm"><span></span></h2>
        <h2 id="h.ucj93wf68ply"><span>Table of Contents</span></h2>
        <ul>
                <li><span href="#h.1mweeav8xcl9">1. Introduction</a></span></li>
                <li><span><a href="#h.v0eo1g7h1c27">1.1 Overview</a></span></li>
                <li><span><a href="#h.m1roo59tq5o9">1.2 Glossary</a></span></li>
                <li><span href="#h.y7lsbepmre09">2. System Architecture</a></span></li>
                <li><span><a href="#h.o760dgd1pjdw">2.1 Blockchain</a></span></li>
                <li><span><a href="#h.t7m8pyip661v">2.2 ReactJS</a></span></li>
                <li><span><a href="#h.a6nde6mm8b2">2.3 Database</a></span></li>
                <li><span href="#h.5h10k3klr0wm">3. High-Level Design</a></span></li>
                <li><span><a href="#h.o1v69zszcbwq">High level System overview</a></span></li>
                <li><span><a href="#h.sr0uyuveqquh">Data flow Diagram</a></span></li>
                <li><span href="#h.xk1e9aruxodz">4. Problems and Resolution</a></span></li>
                <li><span><a href="#h.8lmk5cd8g9lt">4.1 Loading Times</a></span></li>
                <li><span><a href="#h.neh0suedohp5">4.2 Data Storage Problem</a></span></li>
                <li><span><a href="#h.bn88worm77qu">4.3 Storing Local Data</a></span></li>
                <li><span><a href="#h.2rxwckytlyct">4.4 Start &amp; End Date Input Errors</a></span></li>
                <li><span><a href="#h.jlv3st7ujjep">4.5 Changing State whilst Component is Unmounted</a></span></li>
                <li><span><a href="#h.21n29rlt3u4y">4.6 Asynchronous Functions</a></span></li>
                <li><span href="#h.p7mboiu4u1vu">5. Installation Guide</a></span></li>
                <li><span><a href="#h.l430q833vsf5">Installation guide video</a></span></li>
                <li><span><a href="#h.plg721t30hq9">Requirements</a></span></li>
                <li><span><a href="#h.1u4zr76uahlb">5.1 Installing the Application</a></span></li>
                <li><span><a href="#h.l2f1p17ixonz">5.2 Starting the Blockchain</a></span></li>
                <li><span><a href="#h.r9ts5720bczv">5.3 Connecting to the Blockchain using Metamask</a></span></li>
                <li><span><a href="#h.zeocz3rx3d7c">5.4 Importing Accounts from the Blockchain</a></span></li>
                <li><span><a href="#h.qhezv16bn8bq">5.5 Running unit tests</a></span></li>
        </ul>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <hr style="page-break-before:always;display:none;">
        <h1 id="h.xxqst3liv9ij"><span></span></h1>
        <h1 id="h.1mweeav8xcl9"><span>1. Introduction</span></h1>
        <h2 id="h.v0eo1g7h1c27"><span>1.1 Overview</span></h2>
        <p><span>This technical specification is an updated complete description of the voting app
                        system, its modules and 3rd party components. This document outlines the architecture, high
                        level design and
                        development issues of the project.</span></p>
        <p><span>&lsquo;Devote&rsquo; is a decentralized voting app that utilizes the Ethereum
                        blockchain, ReactJS and a database to create an anonymous voting system aimed at university
                        societies. It
                        allows the creation of new societal elections, adding candidates, voting in elections,
                        management of society
                        members and automatic calculation of votes.</span></p>
        <p><span>The system uses the blockchain for its many advantages to voting, for example,
                        information stored on it is immutable and cryptographically secured by hundreds of nodes on the
                        blockchain.
                        This prevents tampering of data or falsified votes.</span></p>
        <h2 id="h.4xlnils7hyi0"><span></span></h2>
        <h2 id="h.m1roo59tq5o9"><span>1.2 Glossary</span></h2>
        <p><span>Blockchain</span></p>
        <p><span>A blockchain is a growing list of records, called blocks, that are linked using
                        cryptography. Each block contains a cryptographic hash of the previous block, a hash of the
                        current block,
                        and the transaction data (in our case, a vote) of the block.</span></p>
        <p><span>Smart contract</span></p>
        <p><span>A smart contract is a piece of code that is stored on the blockchain. This piece
                        of
                        code is then fetched and executed when required. As it is stored on the blockchain it is
                        distributed and
                        immutable.</span></p>
        <p><span>Solidity</span></p>
        <p><span>Solidity is a statically-typed, object-oriented programming language developed by
                        Ethereum for writing smart contracts. It is designed to have a similar syntax to JavaScript. It
                        is used for
                        implementing smart contracts on various blockchain platforms, most notably, Ethereum.</span></p>
        <p><span>Ethereum</span></p>
        <p><span>Ethereum is an open-source, public, blockchain-based distributed computing
                        platform
                        and operating system featuring smart contract functionality. Ethereum provides a decentralized
                        virtual
                        machine, the Ethereum Virtual Machine (EVM), which can execute smart contracts using an
                        international
                        network of public nodes.</span></p>
        <p><span>Ganache</span></p>
        <p><span>Ganache is 3rd party software that creates a private Ethereum blockchain to run
                        tests, execute commands, and inspect state while controlling how the chain operates. It provides
                        the ability
                        to perform all actions you would on the main chain without having to use real cryptocurrency. It
                        provides
                        convenient tools such as advanced mining controls and a built-in block explorer.</span></p>
        <p><span>DApp</span></p>
        <p><span>A decentralized-app (DApp) is a computer application that runs on a distributed
                        system, i.e. the blockchain.</span></p>
        <p><span>Metamask</span></p>
        <p><span>Metamask is a browser extension that allows the user to run Ethereum Dapps in
                        your
                        browser without running a full Ethereum node. MetaMask includes a secure identity vault,
                        providing a user
                        interface to manage your identities on different sites and sign blockchain transactions.</span>
        </p>
        <p><span>Web3 JS (Ethereum JavaScript API)</span></p>
        <p><span>Web3 JS is a collection of libraries which interact with a local or remote
                        Ethereum
                        node, using an HTTP or IPC connection.</span></p>
        <p><span>NoSQL</span></p>
        <p><span>A NoSQL database provides a mechanism for storage and retrieval of data that is
                        modeled in means other than the tabular relations used in relational databases.</span></p>
        <p><span></span></p>
        <p><span></span></p>
        <h1 id="h.y7lsbepmre09"><span>2. System Architecture</span></h1>
        <p><span>This section describes the high level overview of the entire voting system
                        including
                        its modules and 3rd party components. There are three main components that function in unison to
                        create the
                        decentralized voting app:</span></p>
        <h2 id="h.o760dgd1pjdw"><span>2.1 Blockchain</span></h2>
        <p><span>This component consists of an Ethereum blockchain network, an Ethereum node and a
                        Smart contract deployed on the blockchain network. The Ethereum node is a client on the network
                        that
                        communicates with the smart contract. The smart contract is written in Solidity - a programming
                        language
                        designed specifically for writing smart contracts on the Ethereum blockchain. The contract
                        contains logic
                        for adding new elections and candidates, casting votes and storing voting information on the
                        blockchain.
                        Ganache was used in this project for development purposes. Ganache provides a personal Ethereum
                        blockchain
                        network to deploy contracts and execute commands. It provides the ability to perform all actions
                        you would
                        on the main chain without the cost. Metamask is an Ethereum wallet that runs in your browser and
                        allows you
                        to interact with Ethereum-enabled web apps such as Devote.</span></p>
        <h2 id="h.t7m8pyip661v"><span>2.2 ReactJS</span></h2>
        <p><span>React is a JavaScript library for building user interfaces and building web apps.
                        In
                        the voting system it serves as the front-end user interface and handles requests to both the
                        database and to
                        the blockchain contract. </span></p>
        <p><span>Web3.js is used as a Javascript library to interact with a local or remote
                        ethereum
                        node. It is used as an API to the blockchain contract. It works in conjunction with React to
                        make calls to
                        the contract functions and send or receive data.</span></p>
        <h2 id="h.a6nde6mm8b2"><span>2.3 Database</span></h2>
        <p><span>Firebase is a mobile and web application development platform provided by Google.
                        Firestore is a database provided by Firebase. It is a fast, NoSQL document database that is used
                        to store
                        various information such as invite codes, election expiry dates, users and societies. It acts as
                        an extra
                        layer of control above the blockchain and allows for fast data retrieval and storage.</span></p>
        <h1 id="h.5h10k3klr0wm"><span></span></h1>
        <h1 id="h.t56qqr3bh8zm"><span>3. High-Level Design</span></h1>
        <h2 id="h.o1v69zszcbwq"><span>High level System overview</span></h2>
        <p><span>React components create the user interface and manage requests to and from the
                        backend. They are located in the directory </span><span>code/src/components</span><span>.</span>
        </p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 391.00px; height: 361.00px;"><img
                                alt="High level system Overview"
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image5.png"
                                style="width: 391.00px; height: 361.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <h2 id="h.sr0uyuveqquh"><span>Data flow Diagram</span></h2>
        <p><span>This diagram illustrates how data is sent and received in the system. Data
                        stores
                        such as </span><span>user</span><span>, </span><span>societies</span><span>&nbsp;and
                </span><span>inviteCodes</span><span>&nbsp;are located on the Firestore Database. The
                        Smart Contract component interacts with the
                        blockchain and stores information such as candidates and election details.</span></p>
        <p><span>The contract is written in Solidity and is located in the directory
                </span><span>code/src/contracts/VotingApp.sol</span></p>
        <p><span>React is used as the client user interface. It allows users to easily execute
                        functions and interact with the blockchain.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 457.33px;"><img
                                alt="Data flow diagram"
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image7.png"
                                style="width: 624.00px; height: 457.33px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span>&nbsp;</span></p>
        <h1 id="h.xk1e9aruxodz"><span>4. Problems and Resolution</span></h1>
        <p><span>This section includes a description of any major problems encountered during the
                        design and implementation of the system and the actions that were taken to resolve them.</span>
        </p>
        <h2 id="h.8lmk5cd8g9lt"><span>4.1 Loading Times</span></h2>
        <p><span>At the beginning of our project, our system was so simple that everything loaded
                        almost instantaneously. As we added more and more content, it started taking a few seconds to
                        retrieve data
                        from both the blockchain and the database. This resulted in a blank page until the data finally
                        loaded. The
                        solution to this problem was to add a new loading state for every major function in the system.
                        When a
                        component is being loaded, the loading state is set to true. When the component is finished
                        loading, the
                        loading state is set to false. All components on the site are conditionally rendered based on
                        the value of
                        the loading state. </span></p>
        <p><span>A custom loading animation is played whilst a component is being loaded to give
                        the
                        system a very app-like feel.</span></p>
        <h2 id="h.neh0suedohp5"><span>4.2 Data Storage Problem</span></h2>
        <p><span>We couldn&#39;t store all the information needed on the blockchain because the
                        more
                        information on the blockchain, the longer it takes to query it. We needed a database to
                        implement all the
                        required functionality. The most optimal database to use in our case was the Firestore hosted by
                        Google.
                        This gave us a free website to host our application and a database.</span></p>
        <p><span>The Firestore has its own unique syntax for retrieving information which we both
                        have
                        never used. We had to go through the documentation on the Firestore website to learn how to
                        query and add
                        data to the database. It took roughly two days to overcome this learning curve and competently
                        write data to
                        and from the Firestore.</span></p>
        <h2 id="h.bn88worm77qu"><span>4.3 Storing Local Data</span></h2>
        <p><span>In the beginning I used a naive solution by making a call to the database every
                        time
                        I needed some information. This slowed the program down significantly and made the pages feel
                        very sluggish
                        as they took so long to load. A better solution to this problem is to store all the information
                        required
                        from one database call in a React State. The state doesn&#39;t get reset unless the page is
                        reloaded. The
                        information from this state can be passed down to lower level components using React Props. When
                        a page is
                        loaded, the system makes all the major database calls and stores the information in a number of
                        different
                        state variables. This data can then be loaded on any page almost instantaneously. The initial
                        load time
                        takes longer because of this, but only about three seconds. This is a very good trade off as we
                        removed most
                        of the loading required after the site is loaded for the first time.</span></p>
        <h2 id="h.2rxwckytlyct"><span>4.4 Start &amp; End Date Input Errors</span></h2>
        <p><span>On the election page, we needed the functionality to set a start and end date for
                        the
                        election. The input for these dates and times had to have detailed error handling to guide the
                        user through
                        the process. The input in the finished application can detect eight different errors:</span></p>
        <ul>
                <li><span>Wrong Start Date Input</span></li>
                <li><span>Wrong Start Time Input</span></li>
                <li><span>Wrong End Date Input</span></li>
                <li><span>Wrong End Time Input</span></li>
                <li><span>Start Date must be later than the current date</span></li>
                <li><span>Start Time must be later than current time (if date is the
                                same)</span></li>
                <li><span>End date must be at least 12 hours after the start
                                date</span></li>
                <li><span>Election must have two candidates before it can be
                                started</span>
                </li>
        </ul>
        <p><span>This was a very challenging aspect to the application as it was very heavy with
                        logic. This component took the most time of all the components in the application. This is
                        because I had to
                        take two dates and two times as inputs. The dates and times has to be constructed into two date
                        objects and
                        compared against one another to ensure there are no errors. The dates had to be stored in the
                        database and
                        the software had to automatically start or end an election based on the current date and time.
                        After nearly
                        a week of working on this component it was finally finished without bugs.</span></p>
        <h2 id="h.jlv3st7ujjep"><span>4.5 Changing State whilst Component is
                        Unmounted</span>
        </h2>
        <p><span>This was a problem specific to the React framework that we chose. We both had
                        never
                        used React prior to this project and used a number of naive solutions in the beginning. This
                        later caught up
                        with us as we started receiving errors about changing state whilst the component isn&#39;t
                        mounted. To solve
                        this problem, we had to add lots of if/else statements to the start of each component and ensure
                        that a
                        state was mounted before trying to access or change it.</span></p>
        <h2 id="h.21n29rlt3u4y"><span>4.6 Asynchronous Functions</span></h2>
        <p><span>We had a lot of issues with data not being retrieved on time due to synchronous
                        calls
                        to the database. We were both new to asynchronous functions and had a slight grasp on the
                        concept. After
                        reading as much information about them as we could, we started implementing them into our
                        database calls to
                        allow the information to be retrieved before processing more of the function. This also solved
                        an important
                        issue where it took two refreshes to change the state of an election. Using asynchronous calls
                        it now
                        changes state in a single refresh.</span></p>
        <h1 id="h.b71myl2hjg9b"><span>5. Installation Guide</span></h1>
        <h2 id="h.l430q833vsf5"><span>Installation guide video</span></h2>
        <p><span>You can view the Installation guide video here:</span></p>
        <p><span><a 
                                href="https://www.google.com/url?q=https://www.youtube.com/embed/2tP3DLb9yXk&amp;sa=D&amp;source=editors&amp;ust=1639141049732000&amp;usg=AOvVaw3JnEuLWDz9xiF9pF9LW0Ux">https://www.youtube.com/embed/2tP3DLb9yXk</a></span>
        </p>
        <h2 id="h.plg721t30hq9"><span>Requirements</span></h2>
        <p><span>Before proceeding, you will need to have the following packages installed on your
                        machine:</span></p>
        <ul>
                <li><span>Npm (</span><span><a 
                                        href="https://www.google.com/url?q=https://www.npmjs.com/get-npm&amp;sa=D&amp;source=editors&amp;ust=1639141049733000&amp;usg=AOvVaw19l3YT5fWLfnL29PPq2SVX">https://www.npmjs.com/get-npm</a></span><span>)</span>
                </li>
                <li><span>Git (</span><span><a 
                                        href="https://www.google.com/url?q=https://git-scm.com/&amp;sa=D&amp;source=editors&amp;ust=1639141049734000&amp;usg=AOvVaw1BLyG6xcjq27pfQQ4w3q_d">https://git-scm.com/</a></span><span>)</span>
                </li>
                <li><span>Ganache (</span><span><a 
                                        href="https://www.google.com/url?q=https://www.trufflesuite.com/ganache&amp;sa=D&amp;source=editors&amp;ust=1639141049735000&amp;usg=AOvVaw23K38mYnFQQTSoyRuSR-MO">https://www.trufflesuite.com/ganache</a></span><span>)</span>
                </li>
                <li><span>Metamask (</span><span><a 
                                        href="https://www.google.com/url?q=https://metamask.io/download.html&amp;sa=D&amp;source=editors&amp;ust=1639141049735000&amp;usg=AOvVaw1M41RzQEjoxr8LyZBt-2Ck">https://metamask.io/download.html</a></span><span>)</span>
                </li>
        </ul>
        <h2 id="h.1u4zr76uahlb"><span>5.1 Installing the Application</span></h2>
        <p><span>After installing all packages, open command prompt and enter the following
                        commands
                        in a suitable directory:</span></p>
        <ul>
                <li><span>git clone https://github.com/xy3/devote.git
                                devote</span></li>
                <li><span>cd devote/code</span></li>
                <li><span>npm install --save</span></li>
                <li><span>truffle migrate --reset</span></li>
                <li><span>npm run start</span></li>
        </ul>
        <p><span>After typing </span><span>npm run start</span><span>&nbsp;your console will open a webpage on
                </span><span>https://localhost:3000</span></p>
        <h2 id="h.l2f1p17ixonz"><span>5.2 Starting the Blockchain</span></h2>
        <p><span>Once you have </span><span>Ganache</span><span>&nbsp;downloaded, opening the program will show this
                        screen. </span><span>Click
                        Quickstart</span><span>. This will bring you to this screen. </span><span>Click the
                        Settings Icon</span><span>&nbsp;in the </span><span>top right</span><span>&nbsp;of the
                        window.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 153.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image11.png"
                                style="width: 624.00px; height: 416.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span>Click Server</span><span>&nbsp;in the navigation bar at the top and
                        ensure the </span><span>Port Number</span><span>&nbsp;is equal to
                </span><span>8545</span><span>.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 257.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image6.png"
                                style="width: 624.00px; height: 416.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <h2 id="h.r9ts5720bczv"><span>5.3 Connecting to the Blockchain using
                        Metamask</span>
        </h2>
        <p><span>After installing the Metamask browser extension, click &lsquo;Get Started&rsquo;
                        once the window opens. Follow the instructions to set up a new account. Once you have finished,
                        click
                        the</span><span>&nbsp;small Metamask icon</span><span>&nbsp;in the top
                        right corner of
                        your browser.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 110.00px; height: 38.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image8.png"
                                style="width: 110.00px; height: 38.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span>Select the dropdown menu</span><span>&nbsp;labeled </span><span>Main Ethereum
                        Network</span><span>&nbsp;at the top of the Metamask
                        extension.</span>
        </p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 357.00px; height: 145.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image12.png"
                                style="width: 357.00px; height: 601.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span>Change the network</span><span>&nbsp;from </span><span>Main
                        Ethereum Network</span><span>&nbsp;to </span><span>Localhost
                        8545</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 355.00px; height: 303.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image2.png"
                                style="width: 355.00px; height: 598.00px; margin-left: 0.00px; margin-top: -295.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <h2 id="h.zeocz3rx3d7c"><span>5.4 Importing Accounts from the Blockchain</span></h2>
        <p><span>There are ten accounts available with Ganache. To import an account,
                </span><span>click the key icon</span><span>&nbsp;next to one of the ten accounts
                        on the
                </span><span>Ganache home screen</span><span>.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 203.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image1.png"
                                style="width: 624.00px; height: 415.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span>Copy the Private Key</span><span>&nbsp;from the window that pops up
                        and
                </span><span>click done</span><span>.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 184.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image10.png"
                                style="width: 624.00px; height: 415.00px; margin-left: 0.00px; margin-top: -127.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span>Click the Metamask icon</span><span>&nbsp;in the top right corner of
                        your
                        browser and </span><span>click the circle icon</span><span>&nbsp;in the
                        top right of
                        Metamask.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 352.00px; height: 134.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image9.png"
                                style="width: 352.00px; height: 597.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span>Select the Import Account</span><span>&nbsp;option from the
                        dropdown.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 352.00px; height: 333.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image4.png"
                                style="width: 352.00px; height: 597.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span></span></p>
        <p><span>Paste the Private Key</span><span>&nbsp;into the highlighted input
                        form.
                </span><span>Click import.</span></p>
        <p><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 352.00px; height: 316.00px;"><img
                                alt=""
                                src="https://raw.githubusercontent.com/xy3/devote/master/img/technical_spec/image3.png"
                                style="width: 352.00px; height: 597.00px; margin-left: 0.00px; margin-top: -238.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);"
                                title=""></span></p>
        <p><span>Multiple accounts can be imported to Metamask from ganache using their unique
                        private
                        keys. You can swap between accounts in the Metamask browser extension and refresh Devote to
                        represent
                        different users.</span></p>
        <p><span>Once these steps have been completed, you are ready to use Devote.</span></p>
        <p><span>&nbsp;</span></p>
        <h2 id="h.qhezv16bn8bq"><span>5.5 Running unit tests</span></h2>
        <p><span>To run unit tests on the Solidity contract first make sure you are in the
                </span><span>code</span><span>&nbsp;directory. Then execute the following
                        command:</span>
        </p>
        <p><span>truffle test</span></p>
        <p><span>This executes the unit tests located in the </span><span>test</span><span>&nbsp;directory. Truffle uses
                        the Mocha testing
                        framework and Chai
                        for assertions on the Solidity smart contract. The tests will run and check that essential
                        system
                        functionality is operational, for example creating elections, adding candidates and
                        voting.</span></p>
        <p><span>&nbsp;</span></p>
        <p><span></span></p>
        <p><span></span></p>
</body>

</html>
<h1>Table of Contents</h1>

1.  **Introduction**
    1. Overview
    2. Business Context
    3. Glossary
2.  **General Description**
    1.  Product / System Functions
    2.  User Characteristics and Objectives
    3.  Operational Scenarios
    4.  Constraints
3.  **Functional Requirements**
    1.  Login
    2.  Register
    3.  Account Privileges
    4.  Vote
    5.  View Vote
    6.  Create Election
    7.  Search & View Elections
    8.  End Election
    9.  Group Membership
4.  **System Architecture**
5.  **High-Level Design**
6.  **Preliminary Schedule**
7.  **Appendices**

<br></br>
 
<h1>1. Introduction</h1>


<h2>1.1 Overview</h2>


This project is a decentralized voting application that provides a platform for secure, anonymous ballots and elections. It uses blockchain technology to ensure the immutability of votes and utilizes Ethereum’s distributed computing tools to achieve this.


The application has the functionality to create an election, place a vote, and view real-time vote comparisons between the candidates. This application is completely electronic and could make the use of paper-based electoral systems obsolete. 


<h2>1.2 Business Context</h2>

The primary usage of the project is aimed at society committee elections in universities. Our application will be developed to provide a voting service for college societies across Ireland, primarily in Dublin City University. 


The application will be developed in a modular way so that it could also be used as a simple voting application for any purpose, for example, its usage could extend to user surveys and ballots of any description. It will be created with the main purpose of college society elections.

<h2>1.3 Glossary</h2>


**Blockchain** <br></br>
A blockchain is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a hash of the current block, and the transaction data (in our case, a vote) of the block.


**Smart contract** <br></br>
A smart contract is a piece of code that is stored on the blockchain. This piece of code is then fetched and executed when required. As it is stored on the blockchain it is distributed and immutable.


**Solidity** <br></br>
Solidity is a statically-typed, object-oriented programming language developed by Ethereum for writing smart contracts. It is designed to have a similar syntax to JavaScript. It is used for implementing smart contracts on various blockchain platforms, most notably, Ethereum. 


**Ethereum** <br></br>
Ethereum is an open-source, public, blockchain-based distributed computing platform and operating system featuring smart contract functionality. Ethereum provides a decentralized virtual machine, the Ethereum Virtual Machine (EVM), which can execute smart contracts using an international network of public nodes.


**Ganache** <br></br>
Ganache is a piece of software that creates a private Ethereum blockchain to run tests, execute commands, and inspect state while controlling how the chain operates. It provides the ability to perform all actions you would on the main chain without having to use real cryptocurrency. It provides convenient tools such as advanced mining controls and a built-in block explorer.


**DApp** <br></br>
A decentralized-app (DApp) is a computer application that runs on a distributed system, i.e. the blockchain.


**Metamask** <br></br>
Metamask is a browser extension that allows the user to run Ethereum Dapps in your browser without running a full Ethereum node. MetaMask includes a secure identity vault, providing a user interface to manage your identities on different sites and sign blockchain transactions.


**Web3 JS (Ethereum Javascript API)** <br></br>
Web3 JS is a collection of libraries which interact with a local or remote Ethereum node, using an HTTP or IPC connection.


<h1>2. General Description</h1>

<h2>2.1 Product / System Functions</h2>


The necessary functions for the voting system are, but are not limited to, the following:



*   Register
*   Login
*   Search for election
*   View election information
*   Make a vote*
*   Create a new election*
*   End an election*
*   Give user voting permissions*
*   Add user to a group*

_* Login is required_


<h2>2.2 User Characteristics and Objectives</h2>


Although the website will be hosted publicly online, not all of its functionalities are accessible to all users.


**Unregistered users** <br></br>
Until a user has signed up on the website, they have only one function available to them, to view previous elections and votes.


**Administrators** <br></br>
Admins are members with elevated permissions. They have all the permissions members have, with the added ability to _end_, _create_ and _view_ every member’s elections and votes. The system is aimed at being fully automated so that minimal moderation is necessary. Moderation of the system may include ending unused elections, removing fake votes or banning users from using the system. Admin accounts will be primarily used for debugging purposes and light moderation.


**Members (Registered users)** <br></br>
All member accounts have the same permissions, however, they can differ in their usage. Members can create their own user groups and add society members to it. This provides the group members with permission to partake in the societies elections. Member functions are discussed in more detail in section 3.



<h2>2.3 Operational Scenarios</h2>


**Register** <br></br>
Users of the voting system must create an account to create and participate in elections. They will register by filling out an HTML form on the website that connects to the user database. The website controls the user input by first validating it to check it conforms with our security requirements and prompts the user to change it if necessary. 


**Member Login** <br></br>
After registration, members can proceed to login to the site using a username and password. This will allow them to access member restricted areas and participate in elections. If a user enters an incorrect username/password combination, they will be notified and prompted to try again.


**Vote*** <br></br>
Once logged in, a user can vote by navigating to the voting page and using the user interface to make their choices before submitting. Only elections in progress will be displayed and in the case that a user votes on an election after it has been closed, or that they do not have permission to vote on, they will be shown a relevant warning message and instructions on how to proceed.


**View election info** <br></br>
When an election is being created, the creator will have an option to show real-time vote comparisons between the candidates, or only reveal this information when the election has finished. All users can view every other election properties, such as the start and end date of the election and the list of candidates. 


**Create election*** <br></br>
It is possible to create an election once the user is logged in, by using the provided UI form.


**End election*** <br></br>
Elections can be ended at any stage by the user or committee that started it. Ending and election prematurely will close the voting process, preventing additional users from voting on the election.


**View past elections** <br></br>
The ability to view information about past elections is open to everyone. This is a core aspect of distributed computing, the data is decentralized and everyone has access to view it. Users will be able to view all past elections and the information pertaining to them, but will not be able to view information about singular votes. This is to keep elections and ballots fully anonymous.


**New group / add users to a group*** <br></br>
A member of the voting system or the owner of an election can navigate to the group page and create a new group using the provided user interface form. Groups can be created to provide permissions to a set of users. This is useful for managing permissions for all members of a certain society or club. To add a user to a group, the group creator would enter the username they wish to add into a form. If no user was found with that username, the group creator is notified and prompted to try again. Users can also request to join a group via the provided form. Group owners are notified and can simply deny or approve join requests. Alternatively, group owners can create an invite code or link which can be easily sent via email to multiple users. This is useful for inviting every member of a society.


_* Login is required_



<h2>2.4 Constraints</h2>


**Time constraints** <br></br>
As there is a lot of new technology used in this project, we will have to organize the time so we will have enough time to research and study these new technologies. 


**Security requirements** <br></br>
It is very important that our system cannot be tampered with and it is imperative that it protects against fake votes, users and safeguards user information. The software must be secure in all regards: registration, database access, vote immutability and anonymity.


**Anonymity requirements** <br></br>
One of the key aspects of our application is that users maintain full anonymity while voting on elections. In order for this to be achieved, the system must have the ability to track, store and allow users to view votes and elections, without any user-critical information being displayed to users.


**Moderation** <br></br>
The system we implement must be built in a way that works effectively without much need for human moderators. From our research, using the blockchain is the best way to achieve immutability and reduce the need for moderation. 


<h1>3. Functional Requirements </h1>


<h2>3.1 Login</h2>


**Description** <br></br>
The system will use a member login system to identify each individual participating in an election. The user will use the login form provided on the website to submit their credentials and log in. This will query the database securely and check if the credentials are correct. It will store the user’s name, email and password. The elections will be available only for preview to anybody not logged in. Administrator accounts will have elevated privileges to manually moderate the site if necessary.
For users that are not logged in, the site only provides access to view information on elections. The entirety of the system’s functions are only available once a user is logged in and identified.


**Criticality** <br></br>
The login system is essential to identify the voter and ensure that no user can vote more than once on the same election. An account is essential as it can be given voting permissions to restrict voting to specific elections and ensure only one vote is made per user.


**Technical Issues** <br></br>
User data must be kept secure at all times, this means the login data has to be sent from the client to the server via HTTPS and must be handled safely so that an attacker cannot view the data. The login system and database must be fully immune to SQL attacks.


**Dependencies** <br></br>
This function depends on the user having completed the registration process.


<h2>3.2 Register</h2>


**Description** <br></br>
For a user to log in, they must first register an account. An email and password are required to set up an account. They can do so by navigating to the registration form provided on the website. The website will check the form data to make sure the information is correct and that it meets the security requirements before being inserted into the database. Registering with a Dublin City University (DCU) email address will grant the user access to vote in public DCU societal elections. 


**Criticality** <br></br>
This function is required to allow users to create accounts. It is a mandatory requirement for the system and administrators to track which users created elections or placed votes. It provides a way to relate database schemas by username.


**Technical Issues** <br></br>
Fake users and data will be used for the project demonstration, however, for the purpose of gathering user feedback, we need to follow the Ethics Approval process as we are storing user data. Each password will be salted and then encrypted to ensure the highest level of security. The website must also have an extremely secure network to ensure each user data is protected and hidden from attackers. This means the forms provided on the website must securely send data to and from the server and disallow users from using weak account credentials.


**Dependencies** <br></br>
The system is dependent on an accurate user registry system that effectively identifies individuals with minimal ways to create multiple accounts per user.


<h2>3.3 Account Privileges </h2>


**Description** <br></br>
The system needs to allow certain users to have administrative privileges. The administrators of the site will have extra functionality, such as the ability to end any election or change the details of any election remotely. Users that create elections will also have this permission but for their elections only. Administrators also have the ability to grant admin privileges to other users.


**Criticality** <br></br>
An administrative system is needed to increase the security and durability of the site so that real humans can moderate any suspicious activity, such as creating multiple empty elections or fake bot accounts.


**Technical Issues** <br></br>
These privileges must only be given to trusted members and therefore must have a high level of security to access them.


**Dependencies** <br></br>
This functionality depends on the user accounts to give such permissions.


<h2>3.4 Vote</h2>


**Description** <br></br>
Once a user has logged in, they have the functionality to vote once per election. For elections with a specified voting user base, only the users who have voting permissions for the election can place a vote. If they do not have permission the election will still be visible but the ability to vote for the user will not be present.


**Criticality** <br></br>
The system requires user votes to function. These votes will be issued using a Solidity contract on the blockchain to ensure the accuracy of the election and mitigate the ability to tamper with votes. 


**Technical Issues** <br></br>
The effectiveness of the system relies on its ability to store the voting information accurately and securely. 


**Dependencies** <br></br>
The voting system is dependent on user accounts and on the blockchain structure as this is what we are using to handle voting, track user votes and tally the scores. 


<h2>3.5 View Election Info</h2>


**Description** <br></br>
Any user who visits the website will have access to preview the current state of any election without being logged in. The blockchain structure is completely visible to all peers on the network to ensure the immutability of votes. Elections can be displayed on the listing page provided on the website, searched for using the search form and filtered using multiple different methods: by category, name, candidates, society, date and votes.


**Criticality** <br></br>
This information needs to be displayed in a clean and concise manner. It is important that the user is provided with the essential information of the election, such as the candidate’s names and total votes per candidate so that they can accurately make their vote. Ballots can also be created for referendums where users have multiple choices to vote for. This must be clearly displayed, differently from a regular election so that users are aware of what is required from them.


**Technical Issues** <br></br>
Displaying information dynamically for numerous elections could be a challenge. Information should be updated in real-time so that users are aware of details such as the amount of time until the election closes and whether or not an election is still open. Visual graphs could be used to better display information about an election.


**Dependencies** <br></br>
This function is dependent on the election candidates user information and will directly communicate with the blockchain structure and/or MySQL database to receive the total amount of votes for that election.


<h2>3.6 Create an election</h2>


**Description** <br></br>
Each user will have the functionality to create their own election for any reason. The website will have an election creation page that will prompt the user for all the necessary information to create their own election. The user that creates the election will have elevated privileges to include or exclude any set of users from their election. They may also end their election prematurely.


**Criticality** <br></br>
This feature is critical to the functionality of the system as without the ability to create elections there would be nothing to vote on. 


**Technical Issues** <br></br>
This feature needs to be developed in a way that does not allow multiple elections to be created by a single user at any one specific time. This improves the readability of the site and reduces empty or dormant elections from clogging the election list. Users must also be able to create different types of ballots efficiently.


**Dependencies** <br></br>
This function depends on the user being logged in and for the security requirements to be met.


<h2>3.7 Search & view previous elections</h2>


**Description** <br></br>
Each election will have a unique name and identifier which can be used in the search box to find a specific election quickly. The system will dynamically load and display elections based on the likeness of it’s information to the search query. This will be done by querying the database asynchronously with SQL. If multiple elections match the query they will be displayed in order of date added. The user has the ability to view all votes and choose how they are ordered, e.g. by total votes.


**Criticality** <br></br>
The ability for users to find an election quickly and accurately is essential so that users manage to vote on time, and on the right election. It should also be very easy to find an election so that user experience is not hindered.


**Technical Issues** <br></br>
The effectiveness of finding the correct election on the viewing page is directly proportional to the effectiveness of the voting system. Users should not have to go through lists of old ballots/elections to find the one they are looking for. The listing page will feature the ability to filter the results by category, date, society, candidates and votes.


**Dependencies** <br></br>
This function has no dependencies.


<h2>3.8 End election</h2>


**Description** <br></br>
This feature allows the creator of the election (or an administrator) to end the election at a certain date & time or immediately at their discretion. 


**Criticality** <br></br>
This feature is essential to the system so that creators of elections can end them prematurely if there was a mistake in the information, or if there is no need to keep it open for voting. Election deadlines encourage users to vote on the election faster and therefore allow for a quicker electoral process. As elections cannot be removed from the blockchain, they could instead be tagged as _ended _or with a warning saying that there is an error in the election.


**Technical Issues** <br></br>
Only admins with elevated privileges or the creator of the election should have access to terminate the election. A secure permissions system must be implemented to distinguish which users have the ability to end an election.


**Dependencies** <br></br>
This function requires an active election with sufficient permissions to terminate it. 


<h2>3.9 Group membership</h2>


**Description** <br></br>
The system needs to be able to provide exclusive access for an election to a specific group, such as a society in DCU and not allow any users outside of this group to vote in it. A group membership system could allow the creator of the election to create a group with a set of users to be allowed to vote in their election.


**Criticality** <br></br>
This feature isn’t completely necessary, but it would add very useful functionality to the system for users that don't want to create public elections. 


**Technical Issues** <br></br>
There needs to be an accurate way to identify that someone is in a certain group, such as a member of DCU or more specifically, a certain society within DCU. 


**Dependencies** <br></br>
This function is dependent on the user being logged in.


<h1>4. System Architecture</h1>


**Website** <br></br>
The website is the frontend user-interface for the user. Users will navigate to the website to use the voting system. It provides an easy way for users to interact with the backend software. The website will feature Javascript/jQuery scripts for making asynchronous AJAX requests.


**Database** <br></br>
The database will store the information about elections, users and votes. It serves as a bridge between the website frontend and the blockchain contracts.


**Flask - Python** <br></br>
Flask is a Python web framework. It will be used to handle HTTP requests, interact with the database and render web pages. 


**Solidity contracts** <br></br>
Solidity contracts will handle the logic for giving votes to a user, voting for a candidate, calculating the election winner and delegating voting permissions. Solidity contracts will run on the blockchain.


**Blockchain** <br></br>
The Solidity contracts will be stored and executed on the blockchain. It provides the decentralization of the application.


**Metamask** <br></br>
Metamask will be used to interact with the local Ethereum blockchain. It acts as a transaction wallet and allows developers & users to make transactions without the use of real cryptocurrency.


<h1>5. High-Level Design</h1>

In this section, we further illustrate the voting system with the use of a data-flow diagram and a context diagram.

Below is a Data Flow Diagram of the entire decentralized voting system. It illustrates the processes that users of the system can make, and how the data is used in the system.
<img src="https://drive.google.com/file/d/1pjzvzvmnWgY9Tn6spXXAcJEoDP5vM6uY/view?usp=sharing">


<h2>Context Diagram for Election Privileges</h2>
<img src="https://drive.google.com/file/d/1M_dNEqrqWGW5A9Ma816hDCp9S-wcyiJT/view?usp=sharing">


<h1>6. Preliminary Schedule</h1>

Below is a preliminary Gantt chart illustrating our aim for start and end dates for the project tasks and goals. They could possibly change along the way due to certain tasks being more or less difficult than we have estimated.


<h1>7. Appendices</h2>


Ethereum developer resources


[https://ethereum.org/developers/](https://ethereum.org/developers/)


Solidity documentation


[https://solidity.readthedocs.io/](https://solidity.readthedocs.io/)


Metamask


[https://metamask.io/](https://metamask.io/)


Ethereum


[https://ethereum.org/](https://ethereum.org/)


Web3 JS documentation


[https://web3js.readthedocs.io/](https://web3js.readthedocs.io/)


<!-- Docs to Markdown version 1.0β17 -->

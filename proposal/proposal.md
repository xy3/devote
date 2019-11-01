School of Computing
CA326 Year 3 Project Proposal Form
SECTION A
Project Title: Decentralized Voting App
Student 1 Name: Theo Coyne Morgan 	ID Number: 17338811
Student 2 Name: Ciarán Palmer 	ID Number: 17425304
Staff Member Consulted: Annalina Caputo
 
 Description
A decentralized voting app for society committee elections in universities. Each vote made on the Ethereum blockchain will have a unique hash code, the hash code of the previous block, and the data of the block (which will be a vote). Each hash code is created using both the current data hash and the hash of the previous block. In doing so, this creates a structure (known as a blockchain) that is completely immutable as editing the contents in any block will subsequently make the hash of every block before it invalid. We plan on using this structure to create a versatile, anonymous voting system that can be used in many different circumstances like society elections in universities.
The blockchain is a digital record maintained by every node on the network, in this case the nodes are the voter clients. The record of votes is completely visible to everyone. The job of each client is to verify and updates the record of votes. Voting tokens can be generated and distributed to voters, so that there is a fixed number of votes available, therefore removing the possibility of botted or fake votes. Our application will have the functionality to create an election, vote in the election, and view real time vote comparisons between the candidates. Each vote can be verified using the blockchain structure described above thus eliminating the need for paper based electoral systems. The software will run off the Ethereum blockchain and will be developed using the Solidity programming language. The client will be made in JavaScript and will run on the site. Since it will use tokens and the Ethereum blockchain, it will be completely anonymous and secure.
Once all the votes have been cast and the election is closed, the software will add up all the votes and calculate which candidate is the winner. It will display clearly to everyone who won the vote, and keep a record of it.
 
 
Division of Work
Frontend design - Theo. This involves designing the user interface using HTML and CSS. 
Requirement building - Ciaran. The process of researching what the software requirements are e.g. extra features it needs, changes to the way it works etc.
Technology management - Theo. Managing the use of external programming libraries and frameworks.
Security management - Ciaran. Ensuring that the software has no security issues, and testing the security.
Backend development - Theo & Ciaran. It will require both of us to work on the backend, with Solidity, the blockchain and Python for the client.
 
Programming languages
JavaScript (Web3, ReactJS)
Solidity
SQL
Python
 
Programming tools
Database
Web server
Remix - Ethereum IDE
Ethereum blockchain
Code editor
 
Learning Challenges
Learning about decentralization
Working with Ethereum blockchain
Learning new web frameworks such as React JS
 
Hardware / software platform
Ethereum blockchain
Windows + Linux PC
Linux web server
Flask - Python web framework
 
Special hardware / software requirements
Priority on security
Speed is very important
The Ethereum blockchain
Emphasis on anonymity


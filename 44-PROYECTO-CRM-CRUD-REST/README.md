# IMPORTANT

# You'll need this to make this project work

# Install NodeJS

For this specific scenario you'll have to install node.js so that way you
can simulate an API server connection through localhost using a local JSON file.
You can easily do it by clicking this link: https://nodejs.org/en

# Install JSON-server

Once you have already installed NodeJS. You have to open your powershell or CMD
and then run the following command:
<code>npm install -g json-server</code>

# Final step

After doing the steps above, you'll need to open CMD or powershell again and run
the following command:

<code>json-server db.json -p 4000</code>

The command above allows the localhost server to select the json file which
contains the local database in JSON format and change the port so you'll have
to define the port depending on the available ports in your localhost.
Another way to see that dinamic command it'll be like this:

<code>json-server {filename} -p {desired_available_port}</code>

In the end, once you have already run your configuration and set the port, you
can go to the following url in your preferred browser:

<code>http://localhost:4000</code>

Which should retrieve a JSON response of the data stored in your file and then
you can go and interact with the data as your app requires.

# RESOURCES

For further information about the use of json-server, you can go and check this
repository in GitHub: https://github.com/typicode/json-server

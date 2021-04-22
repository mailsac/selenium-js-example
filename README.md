# Selenium Example Using Mailsac

Selenium and Mailsac can be used to test the delivery and contents of a signup email
sent by a web application.

This example will demonstrate how to configure Selenium and provide code examples
to automate and integrate testing with Mailsac.

## What is Selenium?

Selenium is an automation tool for testing website user interfaces. It is open-source
and supports multiple programming languages such as Java, Python, Javascript etc.

Selenium is not a single tool but is composed a [several tools](https://www.selenium.dev/documentation/en/getting_started/quick/).
Our example will focus on the WebDriver component. This will allow us to
test our application as if a real person were operating the web browser.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/).
- Web Browser
  
[How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs)

## Installing Selenium

The Selenium WebDriver is installed during step 2 by running `npm install`.

1. Clone the selenium-js-example repository and change directories to the cloned repository
   ```
   git clone https://github.com/mailsac/selenium-js-example.git && cd ./selenium-js-example
   ```
2. Install the Selenium WebDriver by running `npm install`
3. Download browser driver for the browser that will be tested (see table for download links).
4. Place the browser driver in the system [PATH](http://en.wikipedia.org/wiki/PATH_%28variable%29)

| Browser | Driver |
| --------| ------ |
| Chrome | [chromedriver(.exe)](http://chromedriver.storage.googleapis.com/index.html) |
| Internet Explorer | [IEDriverServer.exe](http://selenium-release.storage.googleapis.com/index.html) |
| Edge | [MicrosoftWebDriver.msi](http://go.microsoft.com/fwlink/?LinkId=619687) |
| Firefox | [geckodriver(.exe)](https://github.com/mozilla/geckodriver/releases/)
| Safari | [safaridriver](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28) |

The safaridriver is included with Safari 10 for OSX El Capitan and macOS Sierra.
It does require Remote Automation in the Develop Menu to be enabled.

## Set the Browser to Use with Selenium

This example will default to using Firefox. In order to use a different browser
set the `SELENIUM_BROWSER` environment variable.

### List of supported `SELENIUM_BROWSER` values
```
SELENIUM_BROWSER=chrome
SELENIUM_BROWSER=firefox
SELENIUM_BROWSER=internet_explorer
SELENIUM_BROWSER=safari
SELENIUM_BROWSER=edge
SELENIUM_BROWSER=opera
```

## Web Application Overview

The example web application consists of a single page with a form.
The form accepts a username and email address.

![Screenshot of Example Web Application](https://blog.mailsac.com/wp-content/uploads/2021/04/selenium_webapp_screenshot-e1618931225953.png)

Email will be sent using a [script](https://www.smtpjs.com/v3/smtp.js) provided
by [smtpjs.com](https://smtpjs.com). The SMTP configuration is configured in
`app.js`.

```
const mailsacToAddress = "example@mailsac.com"; // Mailsac email address where the email will be sent
const fromAddress = ""; // Address the email will be sent from
const smtpUserName = ""; // Username for smtp server authentication
const smtpPassword = ""; // Password for smtp server authentication
const smtpHost = ""; // hostname of the smtp server
```

## Configuring the Web Application

To send email the SMTP hostname, SMTP username, SMTP password, from address,
and to address need to be defined in `apps.js` . If using Mailsac's SMTP
server, a configuration similar to the following can be used.

```
const mailsacToAddress = "example@mailsac.com"; // Mailsac email address where the email will be sent
const fromAddress = "web-application@mailsac.com"; // Address the email will be sent from
const smtpUserName = "web-application@mailsac.com"; // Username for smtp server authentication
const smtpPassword = "k_g3PpXqNqpw*************"; // Password for smtp server authentication
const smtpHost = "out.mailsac.com"; // hostname of the smtp server
```

## Manual Test of Email Delivery

To manually test email delivery, launch the example web application by running 
`npm start` from the command line. Use a web browser to view http://localhost:8080/index.html

1. Enter a username and email address.
   
   ![Webapp Form](https://blog.mailsac.com/wp-content/uploads/2021/04/selenium_webapp_screenshot-e1618931225953.png)

2. If everything went well you should see a confirmation.
   
   ![Webapp Confirmation](https://blog.mailsac.com/wp-content/uploads/2021/04/selenium_webapp_confirmation.png)

3. Head over to https://mailsac.com to check that the email has been received.
   
   ![Manual Verification of Received Email](https://blog.mailsac.com/wp-content/uploads/2021/04/selenium_webapp_manual_verification-e1618931193430.png)
   
## Automated Testing Using Selenium

To automate UI testing a few different components are required:

- Selenium WebDriver: Automates input into our web application's form
- Mocha: Test framework to run the tests
- HTTP Requests Module: To interact with the Mailsac API
- Assert Module: Validates if a given expression is true
- Webserver: Runs our web application

All of these components are installed when running `npm install`

### Configure Mailsac API Key

To interact with the Mailsac API an API Key is needed. To generate a new
API Key sign in to [Mailsac](https://mailsac.com) and go to the
[API Keys Page](https://mailsac.com/api-keys).

An API Key is available for free to all registered users of Mailsac.

Configure the test to work with your API Key by adding it to the following line
in `./test/test.js`

```
const mailsacAPIKey = ""; // Generated by mailsac. See https://mailsac.com/api-keys
```

### Run the Test

Before running the tests your Mailsac API key needs to be configured in `./test/test.js`
and SMTP settings configured in `app.js`.

The tests can be executed by running `npm test` from the command line.
```shell
npm test

> selenium-tests@1.0.0 test /home/user/repos/selenium-js-example
> mocha



  http-server
    register new user
(node:838754) [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
      ✓ sends email with link to example.com website (1383ms)


  1 passing (1s)
```

The last line in the above code snippet `1 passing (1s)` shows our test passed.
If the test failed, an error message will be displayed.

If you are using a browser other than Firefox you will need to add an environment
variable when running the tests (eg `SELENIUM_BROWSER=chrome npm test`).

## Using Mocha and Selenium to Automate Tests

This section will cover how Mocha and Selenium work together in this code example
to test email delivery.

The integration tests are located in `./test/test.js`. The tests are written in Mocha, which
uses a behavior driver development model. This allows for the description of tests
in easy to understand language.

### Mocha Test Introduction

In the following example, the `describe` block includes a description of what
is being tested. The `it` block describes the expected result. `assert` is used to test
the for truth. If the expected statement is not true, there will be an exception,
and the test will fail.

```javascript
describe("tests truth", () => {
    it('true equals true', function() {
        assert(true); // assert checks for truth
    });
    it('false equals false', () => {
        // assert equal checks the first and second parameter are equal
        assert.equal(false,false);
    });
})
```

### Mocha and Selenium

This section is a line by line explanation of the Mocha tests in the example.

Mocha is used to call the Selenium WebDriver to perform actions on the example
Web Application. The `describe` block shows we are going to be testing the process
of registering a new user. The `it` block tells us what we expect to happen.

Inside the `it` block Selenium WebDriver is instructed to:
- open a web browser using the webapp's localhost URL
- find the html element with the id `username` and enter text in the field
- find the html element with the id `email` and enter specified text in the field
- find the html element with the id `submitUserCreation` and click on it

Our webapp will then email the address submitted by Selenium.

There is a `for` loop, following the Selenium commands, that uses the Mailsac
API to fetch the mail from the specified email address. If an email isn't found,
it will retry 10 times waiting about 5 seconds between tries.

If no messages are received from the Mailsac API after 10 tries, `assert` will
create an exception and throw the error `Never received messages!`. The contents
of the email are checked to see if the link `https://example.com` is in the email.
If, the link is not found, an exception is created stating `Missing / Incorrect link in email`

```javascript

describe("register new user", function () {
   this.timeout(50000); // test can take a long time to run. This increases the default timeout for mocha

   it("sends email with link to example.com website", async () => {
      await driver.get(webappUrl); // opens web browser using the webappUrl
      await driver.findElement(webdriver.By.id("username")).sendKeys("webdriver", "ExampleUser"); // find element "username" and enters the tet "ExampleUser"
      await driver.findElement(webdriver.By.id("email")).sendKeys("webdriver", signupEmailAddress); // find element "email" and enters the value for the variable signupEmailAddress (ie user1@mailsac.com)
      await driver.findElement(webdriver.By.id("submitUserCreation")).click(); // click the submit button on the form
      // Check email in the inbox 10x, waiting 5 secs in between. Once we find mail, abort the loop.
      let messages = [];
      for (let i = 0; i < 10; i++) {
         // returns the JSON array of email message objects from mailsac.
         const res = await request("https://mailsac.com")
                 .get(`/api/addresses/${signupEmailAddress}/messages`)
                 .set("Mailsac-Key", mailsacAPIKey);
         messages = res.body;
         if (messages.length > 0) {
            break;
         }
         await wait(4500);
      }
      assert(messages.length, "Never received messages!");
      // After a message is retrieved from mailsac, the JSON object is checked to see if the link was parsed from the email and it is the correct link
      const link = messages[0].links.find((l) => "https://example.com");
      assert(link, "Missing / Incorrect link in email");
   })
})
```

## Next Steps

This example can be modified to automate your team's UI testing procedures.
For another example of Mocha tests using Mailsac see the
[Integration Tests Blog Post](https://blog.mailsac.com/2021/03/15/write-integration-tests-using-mailsac/).

Our [forums](https://forum.mailsac.com) are a great place to discuss usage of Mailsac's API.

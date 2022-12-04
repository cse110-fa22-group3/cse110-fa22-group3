describe('user flow for chores page', () => {


    // get puppeteer
    const puppeteer = require('puppeteer');
    let page;

    // set variables for test chores
    let choresName = 'test';
    let testDesc = 'nothing';
    let testRoommate = 'test'


    // get the website first 
    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost/3000/src/front-end/roommates.html');
        // click on add in webpage and add new roommate
        await page.click('#new');
        // wait for the popup box to add roommates
        await page.waitForSelector('#background-1');
        // need to put in string values for the following because variables were not accepted
        // type in the name of roommate
        await page.$eval('#name-1', nm => nm.value = 'test');
        // type in birthday of roommate
        await page.$eval('#birthday-1', bd => bd.value = '10/31/2008');
        // type in hobbies of roommate
        await page.$eval('#hobbies-1', hb => hb.value = 'programming');
        // type in notes about the roommate
        await page.$eval('#notes-1', nt => nt.value = 'system failure');
        // submit new roommate 
        await page.click('[type="submit"]');
        await page.goto('http://127.0.0.1:5500/src/front-end/chores.html');
    });

    // check to see there are no chores 
    it('First check there are no chores', async () => {
        const choreNum = await page.$$eval('chore-card', (choreN) => {
            return choreN.length;
        });
        expect(choreNum).toBe(0);
    });

    // check to see if we can add a new chores 
    it('Add a new chores', async () => {
        // click on add in webpage and add new chores
        await page.click('#add-chore');
        // wait for the popup box to add chores
        await page.waitForSelector('#create-background');

        // type in the name of chores
        await page.$eval('#c-chore-name', nm => nm.value = 'test');

        //click the drop-down boxes and select
        await page.click('#c-roommate-name');
        await page.select('#c-roommate-name', '0');

        // type in desc of chores
        await page.$eval('#c-description', de => de.value = 'test');

        // submit new chores 
        await page.click('[type="submit"]');
        // wait for the popup box to create chores
        await page.waitForSelector('#assign-background');
        await page.click('#checkbox-0');
        // create  new chores
        await page.click('[type="submit"]');

        // check to see if new chores was added 
        const numchore = await page.$$eval('chore-card', (n) => {
            return n.length;
        });
        // if new chores is added then chores card should contain 1 new chores
        expect(numchore).toBe(1);
    });

    // check to see if the chores we created is the correct one and information is stored
    // first we check chores name
    it('Check chores name', async () => {
        // grab chores card 
        const currchores = await page.$('chores-card');
        // grab shadowroot from chores card
        let shadowchores = await currchores.getProperty('shadowRoot');
        // grab the html element storing the name
        let headerTag = await shadowchores.$('h2');
        // grab the value of the html element 
        let innerText = await headerTag.getProperty('innerText');
        // turn the value into string (get name)
        let name = await innerText.jsonValue();
        // compare name with test name 
        expect(name).toBe(choresName);
    });

    // second we check chores Assigned Roommate
    it('Check chores Assigned Roommate', async () => {
        // grab chores card
        const currchores = await page.$('chores-card');
        // grab shadowroot from chores card
        let shadowchores = await currchores.getProperty('shadowRoot');
        // grab html element storing birthday
        let headerTag = await shadowchores.$('h3');
        // grab the value of html element
        let innerText = await headerTag.getProperty('innerText');
        // turn the value into a string 
        let Roommate = await innerText.jsonValue();
        // test that the Assigned Roommate gotten is the one that we tested 
        expect(Roommate).toBe(testRoommate);
    })

    // third we check Description
    it('Check chores Description', async () => {
        // grab chores card
        const currchores = await page.$('chores-card');
        // grab shadowroot from chores card
        let shadowchores = await currchores.getProperty('shadowRoot');
        // grab html element storing choress hobbies
        let pTags = await shadowchores.$$('p');
        // grab the value of html element
        let innerText = await pTags[1].getProperty('innerText');
        // turn the value into a string 
        let desc = await innerText.jsonValue();
        // test to see if hobbies is the same as test hobby
        expect(desc).toBe(testDesc);
    });

    // check to see if we can update choress from the list 
    it('Check update choress', async () => {
        // click on the chores list   
        await page.click('[id="0"]');
        // wait for response 
        await page.waitForSelector('#edit-background');
        // change chores text to "changed"  
        await page.$eval('#e-chore-name', nt => nt.value = 'changed');
        // click continue button 
        await page.click('[type="submit"]');
        // wait for response
        await page.waitForSelector('#edit-assign-background');
        // click Edit button
        await page.click('[type="submit"]');
        // wait for response
        await page.waitForSelector('html');
        // grab chores card 
        // need to grab all chores-card's because grabing only one will not get the one we changed
        const currchores = await page.$$('chores-card');
        // grab shadowroot from chores card
        let shadowchores = await currchores[0].getProperty('shadowRoot');
        // grab html element storing notes
        let headerTag = await shadowchores.$('h2');
        // grab the value of html element
        let innerText = await headerTag.getProperty('innerText');
        // turn the value into a string 
        let choreName = await innerText.jsonValue();
        // test to see if notes is the same as test note
        expect(choreName).toBe('changed');
    });

    // check to see if we can delete chores from the list 
    it('Check delete chores', async () => {
        // click on the chores list 
        await page.click('[id="0"]');
        // wait for response 
        await page.waitForSelector('#edit-background');
        //click Delete
        await page.click('[id="delete-1"]');
        // check to see if chores was delete 
        const numChore = await page.$$eval('chore-card', (n) => {
            return n.length;
        });
        // if new chores is delete then chores card should nothing
        expect(numChore).toBe(0);
    });

});

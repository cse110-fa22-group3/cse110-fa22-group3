describe('user flow for roommates page', () => {

    // get puppeteer
    const puppeteer = require('puppeteer');
    let page;

    // set variables for test roommate
    let testName = 'John Doe';
    let testBirthday = '10/31/2008';
    let testHobby = 'programming';
    let testNote = 'system failure';
    
    // get the website first 
    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/src/front-end/roommates.html');
    });

    // check to see there are no roommates 
    it ('First check there are no roommates', async() => {
        const nullRoommates = await page.$$eval('roommate-card', (nRoommate) => {
            return nRoommate.length;
        });
        expect(nullRoommates).toBe(0);
    });

    // check to see if we can add a new roommate 
    it ('Add a new roommate', async() => {
        // click on add in webpage and add new roommate
        await page.click('#new');
        // wait for the popup box to add roommates
        await page.waitForSelector('#background-1');
        // need to put in string values for the following because variables were not accepted
        // type in the name of roommate
        await page.$eval('#name-1', nm => nm.value = 'John Doe');
        // type in birthday of roommate
        await page.$eval('#birthday-1', bd => bd.value = '10/31/2008');
        // type in hobbies of roommate
        await page.$eval('#hobbies-1', hb => hb.value = 'programming');
        // type in notes about the roommate
        await page.$eval('#notes-1', nt => nt.value = 'system failure');
        // submit new roommate 
        await page.click('[type="submit"]');
        // check to see if new roommate was added 
        const numRoommmate = await page.$$eval('roommate-card', (n) => {
            return n.length;
        });
        // if new roommate is added then roommate card should contain 1 new roommate
        expect(numRoommmate).toBe(1);
    });
    
    // check to see if the roommate we created is the correct one and information is stored
    // first we check roommate name
    it ('Check roommate name', async() => {
        // grab roommate card 
        const currRoommate = await page.$('roommate-card');
        // grab shadowroot from roommate card
        let shadowRoommate = await currRoommate.getProperty('shadowRoot');
        // grab the html element storing the name
        let headerTag = await shadowRoommate.$('h3');
        // grab the value of the html element 
        let innerText = await headerTag.getProperty('innerText');
        // turn the value into string (get name)
        let name = await innerText.jsonValue();
        // compare name with test name 
        expect(name).toBe(testName);
    });
    
    // second we check roommate birthday
    it ('Check roommate birthday', async () => {
        // grab roommate card
        const currRoommate = await page.$('roommate-card');
        // grab shadowroot from roommate card
        let shadowRoommate = await currRoommate.getProperty('shadowRoot');
        // grab html element storing birthday
        let pTags = await shadowRoommate.$$('p');
        // grab the value of html element
        let innerText = await pTags[0].getProperty('innerText');
        // turn the value into a string 
        let birthday = await innerText.jsonValue();
        // test that the birthday gotten is the one that we tested 
        expect(birthday).toBe(testBirthday);
    })

    // third we check roommate hobbies
    it ('Check roommate hobbies', async () => {
        // grab roommate card
        const currRoommate = await page.$('roommate-card');
        // grab shadowroot from roommate card
        let shadowRoommate = await currRoommate.getProperty('shadowRoot');
        // grab html element storing roommates hobbies
        let pTags = await shadowRoommate.$$('p');
        // grab the value of html element
        let innerText = await pTags[1].getProperty('innerText');
        // turn the value into a string 
        let hobby = await innerText.jsonValue();
        // test to see if hobbies is the same as test hobby
        expect(hobby).toBe(testHobby);
    });

    // fourth we check to see if notes is the same 
    it ('Check roommate notes', async () => {
        // grab roommate card
        const currRoommate = await page.$('roommate-card');
        // grab shadowroot from roommate card
        let shadowRoommate = await currRoommate.getProperty('shadowRoot');
        // grab html element storing notes
        let pTags = await shadowRoommate.$$('p');
        // grab the value of html element
        let innerText = await pTags[2].getProperty('innerText');
        // turn the value into a string 
        let note = await innerText.jsonValue();
        // test to see if notes is the same as test note
        expect(note).toBe(testNote);
    });

    // check to see if we can update roommates from the list 
    it ('Check update roommates', async() => {
        // click on the John Doe roommate list   
        await page.click('[id="0"]');
        // wait for response 
        await page.waitForSelector('#background-2');
        // change notes text to something else  
        await page.$eval('#notes', nt => nt.value = 'something else');
        // click save button 
        await page.click('#save_button');
        // now we are back at list page, now we need to check if it saved 
        // wait till we are at roommate card page  
        await page.waitForSelector('body > div.content > div.row');
        // for whatever reason, this test will only work if we have this 
        // do not delete, need to find out why it works when I have this vs not 
        // otherwise this really does nothing for me right now
        const numRoommmate = await page.$$eval('roommate-card', n => {
            return n.length
        });
        // grab roommate card 
        // need to grab all roommate-card's because grabing only one will not get the one we changed
        const currRoommate = await page.$$('roommate-card');
        // grab shadowroot from roommate card
        let shadowRoommate = await currRoommate[0].getProperty('shadowRoot');
        // grab html element storing notes
        let pTags = await shadowRoommate.$$('p');
        // grab the value of html element
        let innerText = await pTags[2].getProperty('innerText');
        // turn the value into a string 
        let note = await innerText.jsonValue();
        // test to see if notes is the same as test note
        expect(note).toBe('something else');
    });
});
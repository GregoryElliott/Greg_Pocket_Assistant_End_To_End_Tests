'use strict';


describe('Gregory first End To End Test', function() {

    beforeEach(function() {
	browser.driver.ignoreSynchronization = true;
	});

    it('Sign into google account', function () {
	browser.driver.manage().deleteAllCookies();
	browser.driver.get('https://accounts.google.com/ServiceLogin?sacu=1&hl=en');

	var emailInput = browser.driver.findElement(by.id('Email'));
	emailInput.sendKeys('teambrown394');

	var signInButton = browser.driver.findElement(by.id('next'));
	signInButton.click();

	browser.driver.sleep(2000);

	var passwordInput = browser.driver.findElement(by.id('Passwd'));
	passwordInput.sendKeys('goteambrown394'); 

	var signInButton = browser.driver.findElement(by.id('signIn'));
	signInButton.click();

	browser.driver.sleep(5000);
    });
    
    
    it('should add an event to the calendar at 5:00 AM', function() {
	browser.driver.get('http://localhost:8000/app/index.html#/view1');
	browser.driver.sleep(2000);
	element(by.buttonText("Click here to get your Calendar!")).click();
	browser.driver.sleep(5000);
	
	element(by.buttonText("Add")).click();

	element(by.model("updateData.summary")).sendKeys("Greg Event");

	var currDate = new Date(Date.now());
	var day = ("0" + currDate.getDate()).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T05:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T06:00:00-05:00";	
	
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);
	
	element(by.buttonText("Add Event")).click();

	browser.driver.sleep(2000);

	expect(element(by.buttonText('Edit Greg Event')).isPresent()).toBe(true);
    });

    
    it('should update the event that was added at 5:00 AM to start at 4:00 AM and change the title to New Test', function() {
	element(by.buttonText("Edit Greg Event")).click();
	browser.driver.sleep(1000);

	element(by.model("updateData.summary")).clear();
	element(by.model("updateData.summary")).sendKeys("New Test");

	var currDate = new Date(Date.now());
	var day = ("0" + currDate.getDate()).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T04:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T05:00:00-05:00";
	element(by.model("updateData.start.dateTime")).clear();
	element(by.model("updateData.end.dateTime")).clear();
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);

	element(by.buttonText("Update")).click();
	browser.driver.sleep(2000);

	expect(element(by.buttonText('Edit New Test')).isPresent()).toBe(true);
    });
    
    it('should remove the event that was updated to start at 4:00 AM', function() {
	element(by.buttonText("Edit New Test")).click();
	browser.driver.sleep(1000);
	element(by.buttonText("Delete")).click();
	browser.driver.sleep(2000);

	expect(element(by.buttonText('Edit Greg Event')).isPresent()).toBe(false);
    });
});

describe('Gregory second End To End Test', function() { 
    it('should add two events to the calendar at 5:00 AM', function() {
	browser.driver.get('http://localhost:8000/app/index.html#/view1');
	element(by.buttonText("Click here to get your Calendar!")).click();
	
	browser.driver.sleep(2000);

	element(by.buttonText("Add")).click();

	browser.driver.sleep(1000);

	element(by.model("updateData.summary")).sendKeys("Greg Event");

	var currDate = new Date(Date.now());
	var day = ("0" + currDate.getDate()).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T05:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T06:00:00-05:00";	
	
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);
	
	element(by.buttonText("Add Event")).click();

	browser.driver.sleep(2000);

	element(by.buttonText("Add")).click();

	browser.driver.sleep(1000)

	element(by.model("updateData.summary")).sendKeys("New Test");

	var currDate = new Date(Date.now());
	var day = ("0" + currDate.getDate()).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T05:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T06:00:00-05:00";	
	
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);
	
	element(by.buttonText("Add Event")).click();

	browser.driver.sleep(2000);
	
	expect(element(by.buttonText('Time Conflict!')).isPresent()).toBe(true);
    });

    
    it('should remove both events that were added to start at 5:00 AM', function() {
	element(by.buttonText("Edit Greg Event")).click();
	browser.driver.sleep(1000);
	element(by.buttonText("Delete")).click();
	browser.driver.sleep(1000);

	element(by.buttonText("Edit New Test")).click();
	browser.driver.sleep(1000);
	element(by.buttonText("Delete")).click();
	browser.driver.sleep(1000);

	expect(element(by.buttonText('Edit Greg Event')).isPresent()).toBe(false);
    });
});

describe('Gregory third End To End Test', function() { 
    it('should add an event to the calendar at 5:00 AM of the next day', function() {
	browser.driver.get('http://localhost:8000/app/index.html#/view1');
	element(by.buttonText("Click here to get your Calendar!")).click();
	
	browser.driver.sleep(2000);

	element(by.buttonText("Add")).click();

	element(by.model("updateData.summary")).sendKeys("Greg Event");

	var currDate = new Date(Date.now());
	var day = ("0" + currDate.getDate()).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T05:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T06:00:00-05:00";	
	
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);
	
	element(by.buttonText("Add Event")).click();

	browser.driver.sleep(2000);

	expect(element(by.buttonText('Edit Greg Event')).isPresent()).toBe(true);
    });

        
    it('should update the event that was added at 5:00 AM to be a reminder', function() {
	element(by.buttonText("Edit Greg Event")).click();
	browser.driver.sleep(1000);

	element(by.model("updateData.summary")).clear();
	element(by.model("updateData.summary")).sendKeys("New Test");

	var currDate = new Date(Date.now());
	var tomorrow = currDate.getDate() + 1;
	var day = ("0" + tomorrow).slice(-2);
	var month = ("0" + (currDate.getMonth() + 1)).slice(-2);

	var start = "2015-" + month + "-" + day + "T06:00:00-05:00";
	var end = "2015-" + month + "-" + day + "T07:00:00-05:00";

	element(by.model("updateData.start.dateTime")).clear();
	element(by.model("updateData.end.dateTime")).clear();
	element(by.model("updateData.start.dateTime")).sendKeys(start);
	element(by.model("updateData.end.dateTime")).sendKeys(end);

	element(by.buttonText("Set Reminder")).click();
	browser.driver.sleep(2000);
	
	element(by.buttonText("Update")).click();
	browser.driver.sleep(2000);
	expect(element(by.buttonText('New Test in 1 day')).isPresent()).toBe(true);
    });
    
    it('should delete the reminder, then go to the next day in the calendar, and remove the event that was updated to be a reminder', function() {
	element(by.buttonText("Delete New Test")).click();
	browser.driver.sleep(1500);
	expect(element(by.buttonText('New Test due in 1 day')).isPresent()).toBe(false);

	element(by.buttonText("Next Day")).click();
	browser.driver.sleep(2500);
	
	element(by.buttonText("Edit [reminder]New Test")).click();
	browser.driver.sleep(1000);
	element(by.buttonText("Delete")).click();
	browser.driver.sleep(2000);
	expect(element(by.buttonText('Edit Greg Event')).isPresent()).toBe(false);
    });

});

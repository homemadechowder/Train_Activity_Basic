# Train_Activity_Basic

### High-level description
A train scheduling app that takes user inputs of:

- Name of the train
- Destination
- Time of first train
- Frequency of arrivals

Then it calculates the time when the next train arrives and how much time you have to wait for it using moment js to get your current time.

### HTML setup

The html setup uses primarily bootstrap and some minor custom css. It uses the jumbotron as a header and 2 cards and multiple form groups to take inputs. 2 example form groups are shown below

```javascript
<div class="form-group">
                <label for="searchTerm">Train Name</label>
                <input type="search" class="form-control" id="trainName">
                
            </div>
            <div class="form-group">
                    <label for="startYear">Destination </label>
                    <input type="year" class="form-control" id="dest">
                    
            </div>
```

a table is created in the first card to have the calculated results appended to.

### Javascript description

The javascript portion is separated into 3 sections, the firebase config, the database ref(), and the submit button onclick function.

#### Firebase Config

Firebase 7.0.3 is linked in the html file and the CDN is copied from the firebase dashboard. Then firebase is initialized and database is linked.

#### Database snapshot

A database.ref() for snapshot getting is created to get value from firebase by snapshotting and storing it into a variable. I then append these values onto the table created in the html file.

#### Submit button onclick function

I started the function with an event.preventDefault(). to stop the webpage from refreshing. I parsed the input values from the formgroups created in the html section. I used moment js to get current time to set as a reference for the values that were to be calculated. 

I used an equation to take the first time of the train and the current time along with its frequency to calculate when the next train will arrive. 

A general run down of this equation is: 

I calculate the difference between the set time and the current time, using this difference I did a modulus operation with the difference in time and the frequency.

This value subtracted from the frequency will give me the amount of time left from the next train arrival. I used this value, add onto my current time will give me the time of the next train's arrival.

This value, tMinutesTillTrain will be pushed onto firebase in the method shown below:

```javascript
   database.ref().set({
       
        trainName: trainName,
        dest: dest,
        timeTrain: moment(nextTrain).format("hh:mm"),
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain

    });
```



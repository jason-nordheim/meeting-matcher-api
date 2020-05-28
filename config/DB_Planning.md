
# Database 

## Models 

### User 

Represents a user of the application 

#### Attributes 
|attribute|type|description| 
|:---|:---|:---|
| id |integer | the unique identifier for the user| 
| first_name | string | the first name of the user | 
| last_name | string | the family name of the user | 
| username | string | the unique login name of the user | 
| password_digest | string | the hashed password of the user | 

#### Relationships 
- A user has many meetings 

### Meeting

Model to represent a timed-commitment 

#### Attributes 
| attribute | type | description | 
|:---|:---|:---|
| id | int | the unique identifier for the meeting | 
| name | string | the verbose name of the meeting | 
| location | string | the verbose name of the location of the meeting | 
| start | datetime | the start date and time of the meeting | 
| end | datetime | the end date and time of the meeting |
 
 #### Relationships 

 - A meeting belongs to a user 
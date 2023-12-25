# VideoT app

## Steps to run app locally
- Clone the app locally
- Open terminal in Vs code and run npm install in backend directory and frontend directory
### configuring the backend .env file
- Create a database on MongoDb atlas and paste the connection link on MONGO_URL =
- Set any PORT = (set port 5000 for running locally)
- SECRET = ( a string of random characters of length 32)
- Create an account on cloudinary and get the details CLOUDINARY_NAME=, CLOUDINARY_API=,CLOUDINARY_SECRET=
- SMPT_MAIL= (enter the email(gmail account) address with which you want to send the mail for forgot password link
- SMPT_PASSWORD= i) Go to your account settings in google and enable two step verification
                 ii) Select 2 step verification and generate an app specific password ( google will generate random string) and paste it in SMPT_PASSWORD
-


const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');

cron.schedule('*/1 * * * *', function(){
    console.log('running a task every 15 minutes');

    axios.get("http://localhost:8008/api/allprojects")
    .then(resp => {
        
        const projects = resp.data[0].projects
        console.log("Projects", projects)

        for (let i=0; i<projects.length; i++) {
        
            let url = projects[i].url
            axios.get(url)
            .then(res => {
                console.log(url, "success")
                
            })
            .catch(err => {
                console.log("project is down", projects[i].url)
                sendMailAndSms(projects[i])
            })
        
        }
    })
    .catch(err => {
        console.log("error in all projects api")
    })

});

const sendMailAndSms = (project) => {
    console.log("Send mail and sms", project)
    for (let j=0; j<project.users.length; j++) {

        let getUserApi = 'http://localhost:8008/api/user?userId='+project.users[j]
        console.log("user fetch url", getUserApi )
        axios.get(getUserApi)
        .then(user => {
            console.log("user resp", user)
            const singleUser = user.data[0].user[0]
            
            console.log("SIngle user", singleUser)
            
            sendMail(project.name, project.url, singleUser.email);

            sendSms(project.name, project.url, singleUser.contact);

        })
        .catch(err => {
            console.log("user fetch error")
        })

    }

}

const sendSms = (projectName, projectUrl, userContact) => {

    const msg = 'Your server is down. \n Project Name: ' + projectName + ' \n URL: '
    + projectUrl
    const smsApi = 'http://mobismpp.vbox.mobi/?user=mobilink_9876&to='+userContact+'&message='+msg
    console.log("SMS api", smsApi)
    axios.get(smsApi)
    .then(smsResp => console.log(smsResp))
    .catch(err => console.log("sms send error"))

}

const sendMail = (projectName, projectUrl, userEmail) => {
    console.log("Sending email")
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: 'bilalasif09@gmail.com',
          pass: 'zozoinlove'
        }
    });

    const mailOptions = {
        from: 'bilalasif09@gmail.com',
        to: userEmail,
        subject: projectName + ' is down',
        text: 'Your server is down. \n Project Name: ' + projectName + ' \n URL: '
         + projectUrl
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

}
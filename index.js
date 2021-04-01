/* Your Code Here */
function createEmployeeRecord(empl) {
    const employee = {}
    employee.firstName = empl[0]
    employee.familyName = empl[1]
    employee.title = empl[2]
    employee.payPerHour = empl[3]
    employee.timeInEvents = []
    employee.timeOutEvents = []
    return employee
}

function createEmployeeRecords(empl) {
    const employeeRecords = []
    empl.map(employee => employeeRecords.push(createEmployeeRecord(employee)))
    return employeeRecords
}

function createTimeInEvent(time) {
    let timeObj = {
      type: "TimeIn",
      hour: parseInt(time.split(' ')[1]),
      date: time.split(' ')[0]
    }
    this.timeInEvents.push(timeObj)
    return this
}

function createTimeOutEvent(time) {
    let timeObj = {
      type: "TimeOut",
      hour: parseInt(time.split(' ')[1]),
      date: time.split(' ')[0]
    }
    this.timeOutEvents.push(timeObj)
    return this
}

function hoursWorkedOnDate(date) {
    let hoursOut = this.timeOutEvents.find(obj => obj.date === date)
    let hoursIn = this.timeInEvents.find(obj => obj.date === date) 
    let hoursWorked = hoursOut.hour/100 - hoursIn.hour/100
    return hoursWorked
 }

 function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    let pay = hours * this.payPerHour
    return pay
}

function calculatePayroll(emps) {
    let allWages = (emps.map(emp => allWagesFor.call(emp)))
    let sum = allWages.reduce((total, amount) => total + amount)
    return sum
}

function findEmployeeByFirstName(empl, name) {
    let record = empl.find(empl => empl.firstName === name)
    return record
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
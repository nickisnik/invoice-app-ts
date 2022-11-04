export type User = {
    name: string,
    color: string,
    id: string,
    position: string,
    photoURL: string
}
export type Event = {
    user_id: string,
    name: string,
    type: string,
    timeStart: {
        nanoseconds: number,
        seconds: number
    },
    timeEnd: {
        nanoseconds: number,
        seconds: number
    }
}
const users = [
    {   name : "Nick N.",
        userId: "12928",
        position: "Bartender",
        color: 'rgb(225, 225, 225)',
        events : [
            {
                eventId: "83917",
                name: "Task 1",
                type: "task",
                timeStart: "Fri Oct 14 2022 09:36:00 GMT+0100 (British Summer Time)",
                timeEnd: "Fri Oct 14 2022 16:10:00 GMT+0100 (British Summer Time)",

            }
        ]
    },
    {   name : "Ashley O.",
        userId: "12118",
        position: "Waiter",
        color: 'rgb(239, 220, 237)',
        events : [
            {
                eventId: "93907",
                name: "Jogging",
                type: "task",
                timeStart: "Sat Oct 15 2022 09:36:00 GMT+0100 (British Summer Time)",
                timeEnd: "Sat Oct 15 2022 16:10:00 GMT+0100 (British Summer Time)",

            }
        ]
    }/* ,
    {   name : "Tim C.",
        userId: "83917",
        position: "Waiter",
        color: 'rgb(239, 217, 217)',
        events : [
            {
                eventId: "93907",
                name: "Jogging",
                type: "task",
                timeStart: "Tue Oct 25 2022 09:36:00 GMT+0100 (British Summer Time)",
                timeEnd: "Tue Oct 25 2022 16:10:00 GMT+0100 (British Summer Time)",

            }
        ]
    },
    {   name : "Roxane",
        userId: "54310",
        position: "Web designer",
        color: 'rgb(199, 210, 247)',
        events : [
            {
                eventId: "93907",
                name: "Jogging",
                type: "task",
                timeStart: "Tue Oct 09 2022 09:36:00 GMT+0100 (British Summer Time)",
                timeEnd: "Tue Oct 09 2022 16:10:00 GMT+0100 (British Summer Time)",

            }
        ]
    } */
]
export default users
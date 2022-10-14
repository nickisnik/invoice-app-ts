export type User = {
    name: string,
    color: string,
    userId: string,
    position: string,
    events: Event[]
}
export type Event = {
    eventId: string,
    name: string,
    type: string,
    timeStart: string,
    timeEnd: string
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
    },
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
    }
]
  /*   {   "name" : "Jason",
        "position": "Designer",
        "events": {
            "03/10/2022": ["Running", "Cooking"],
            "05/10/2022" : ["Laundry"],
            "27/10/2022" : ["Tennis game"]
    }
    },
    {   "name" : "Madeleine",
        "position": "Designer",
        "events": {
            "05/10/2022": ["Running", "Cooking"],
            "09/10/2022" : ["Laundry"],
            "27/10/2022" : ["Tennis game"]
    }
    },
    {   "name" : "Tim",
        "position": "Designer",
        "events": {
            "03/10/2022": ["Running", "Cooking"],
            "05/10/2022" : ["Laundry"],
            "27/10/2022" : ["Tennis game"]
    }
    }
    
] */
export default users
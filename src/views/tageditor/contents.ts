// export const menuList: {
//     key: string;
//     text?: string;
//     icon?: number;
// }[] = [
//         {
//             key: "tracks",
//             text: "Tracks",
//             icon: 0,
//         },
//         {
//             key: "albums",
//             text: "Albums",
//             icon: 0,
//         }
//     ];

export const tabMenuList: {
    title: string;
    tabs: {
        text?: string;
        data?: string;
    }[]
}[] = [
        {
            title: 'Tracks',
            tabs: [
                {
                    text: "Show All",
                    data: '1'
                },
                {
                    text: "New Track",
                    data: ''
                },
            ]
        },
        {
            title: 'Albums',
            tabs: [
                {
                    text: "Show All",
                    data: '3'
                },
                {
                    text: "New Album",
                    data: '',
                }]
        }
    ];

// interface TrackDataRow {
//     id: number;
//     fp: boolean;
//     title: string;
//     time: string;
// }

export const trackData = [
    {
        id: 1,
        title: 'Beetlejuice',
        fp: true,
        time: '11:00',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        fp: false,
        time: '12:00',
    },
]

// interface AlbumDataRow {
//     id: number;
//     title: string;
//     time: string;
// }


export const albumData = [
    {
        id: 1,
        title: 'Beetlejuice',
        time: '11:00',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        time: '12:00',
    },
]

export const genreList: {
    key: string;
    text?: string;
}[] = [
    {
        key: "blues",
        text: "Blues",
    },
    {
        key: "classical",
        text: "Classical",
    },
    {
        key: "country",
        text: "Country",
    },
    {
        key: "jazz",
        text: "Jazz",
    },
    {
        key: "dance",
        text: "Dance",
    },
    {
        key: "ethno_folk",
        text: "Ethno/Folk",
    },
    {
        key: "functional",
        text: "Functional",
    },
    {
        key: "pop",
        text: "Pop",
    },
    {
        key: "r_b",
        text: "R&B",
    },
    {
        key: "rock",
        text: "Rock",
    },
    {
        key: "other",
        text: "Other",
    },
];

export const moodList: {
    key: string;
    text?: string;
}[] = [
    {
        key: "romantic",
        text: "Romantic",
    },
    {
        key: "gloomy",
        text: "Gloomy",
    },
    {
        key: "idyllic",
        text: "Idyllic",
    },
    {
        key: "calm",
        text: "Calm",
    },
    {
        key: "angry",
        text: "Angry",
    },
    {
        key: "tense",
        text: "Tense",
    },
    {
        key: "fearful",
        text: "Fearful",
    },
    {
        key: "lonely",
        text: "Lonely",
    },
    {
        key: "whimsical",
        text: "Whimsical",
    },
    {
        key: "mysterious",
        text: "Mysterious",
    },
];
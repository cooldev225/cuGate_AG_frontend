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

export const explicitContentList : {
    key : number,
    text : string
}[] = [
    {
        key : 0,
        text : "Y"
    },
    {
        key : 1,
        text : "N"
    }
]

export const distributionTerrList : {
    id : number,
    name : string
}[] = [
    {
        id : 1,
        name : "a"
    },
    {
        id : 2,
        name : "b"
    },
    {
        id : 3,
        name : "c"
    }
]

export const performerRoleList : {
    id : string,
    value : string
}[] = [
    {
        "id": "0",
        "value": "..."
    },
    {
        "id": "1",
        "value": "Accordeon"
    },
    {
        "id": "2",
        "value": "Alto"
    },
    {
        "id": "120",
        "value": "Alto Saxophone"
    },
    {
        "id": "3",
        "value": "Arranger"
    },
    {
        "id": "116",
        "value": "Bagpipes"
    },
    {
        "id": "77",
        "value": "Balalaïka"
    },
    {
        "id": "4",
        "value": "Band"
    },
    {
        "id": "5",
        "value": "Bariton"
    },
    {
        "id": "6",
        "value": "Bass"
    },
    {
        "id": "7",
        "value": "Bass (Vocal)"
    },
    {
        "id": "8",
        "value": "Bass Guitar"
    },
    {
        "id": "68",
        "value": "Basse"
    },
    {
        "id": "9",
        "value": "Bassoon"
    },
    {
        "id": "91",
        "value": "Bells"
    },
    {
        "id": "78",
        "value": "Carillon"
    },
    {
        "id": "74",
        "value": "Cavaquinho"
    },
    {
        "id": "87",
        "value": "Celeste"
    },
    {
        "id": "10",
        "value": "Cello"
    },
    {
        "id": "79",
        "value": "Cembalo"
    },
    {
        "id": "11",
        "value": "Chorus"
    },
    {
        "id": "12",
        "value": "Clarinet"
    },
    {
        "id": "88",
        "value": "Clavichord"
    },
    {
        "id": "13",
        "value": "Composer"
    },
    {
        "id": "14",
        "value": "Conductor"
    },
    {
        "id": "80",
        "value": "Congas"
    },
    {
        "id": "114",
        "value": "Contralto"
    },
    {
        "id": "15",
        "value": "Corno Englese"
    },
    {
        "id": "115",
        "value": "Counter Tenor"
    },
    {
        "id": "16",
        "value": "Cover Artist"
    },
    {
        "id": "92",
        "value": "Cymbals"
    },
    {
        "id": "75",
        "value": "Didgeridoo"
    },
    {
        "id": "123",
        "value": "Director"
    },
    {
        "id": "17",
        "value": "Double Bass"
    },
    {
        "id": "93",
        "value": "Drum Set"
    },
    {
        "id": "18",
        "value": "Drums"
    },
    {
        "id": "19",
        "value": "Duduk"
    },
    {
        "id": "102",
        "value": "Dulcimer"
    },
    {
        "id": "20",
        "value": "Electric Violin"
    },
    {
        "id": "69",
        "value": "Engineer"
    },
    {
        "id": "21",
        "value": "Ensemble"
    },
    {
        "id": "103",
        "value": "Erhu"
    },
    {
        "id": "22",
        "value": "Feat."
    },
    {
        "id": "67",
        "value": "Featuring"
    },
    {
        "id": "23",
        "value": "Fiddle"
    },
    {
        "id": "24",
        "value": "Flute"
    },
    {
        "id": "25",
        "value": "French Horn"
    },
    {
        "id": "94",
        "value": "Glass Harmonica"
    },
    {
        "id": "95",
        "value": "Glockenspiel"
    },
    {
        "id": "26",
        "value": "Guitar"
    },
    {
        "id": "104",
        "value": "Guitar (Acoustic)"
    },
    {
        "id": "27",
        "value": "Guitar (Bass)"
    },
    {
        "id": "105",
        "value": "Guitar (Classical)"
    },
    {
        "id": "106",
        "value": "Guitar (Electric)"
    },
    {
        "id": "107",
        "value": "Guitar (Steel)"
    },
    {
        "id": "28",
        "value": "Harmonica"
    },
    {
        "id": "89",
        "value": "Harmonium"
    },
    {
        "id": "29",
        "value": "Harp"
    },
    {
        "id": "30",
        "value": "Harpsichord"
    },
    {
        "id": "31",
        "value": "Horn"
    },
    {
        "id": "81",
        "value": "Horn French"
    },
    {
        "id": "32",
        "value": "Keyboards"
    },
    {
        "id": "108",
        "value": "Koto"
    },
    {
        "id": "117",
        "value": "Krummhorn"
    },
    {
        "id": "109",
        "value": "Lyre"
    },
    {
        "id": "33",
        "value": "Lyricist"
    },
    {
        "id": "34",
        "value": "Mandolin"
    },
    {
        "id": "96",
        "value": "Marimba"
    },
    {
        "id": "35",
        "value": "Mezzo Soprano"
    },
    {
        "id": "82",
        "value": "Musical Box"
    },
    {
        "id": "36",
        "value": "Oboe"
    },
    {
        "id": "37",
        "value": "Oboe d'amore"
    },
    {
        "id": "118",
        "value": "Ocarina"
    },
    {
        "id": "38",
        "value": "Orchestra"
    },
    {
        "id": "39",
        "value": "Organ"
    },
    {
        "id": "40",
        "value": "Oud"
    },
    {
        "id": "41",
        "value": "Pan Flute"
    },
    {
        "id": "42",
        "value": "Percussion"
    },
    {
        "id": "43",
        "value": "Performer"
    },
    {
        "id": "44",
        "value": "Piano"
    },
    {
        "id": "90",
        "value": "Piano (Electric)"
    },
    {
        "id": "70",
        "value": "Producer"
    },
    {
        "id": "45",
        "value": "Reading"
    },
    {
        "id": "46",
        "value": "Recitation"
    },
    {
        "id": "83",
        "value": "Recorder"
    },
    {
        "id": "66",
        "value": "﻿Remixer"
    },
    {
        "id": "119",
        "value": "Sackbut"
    },
    {
        "id": "110",
        "value": "Sarod"
    },
    {
        "id": "47",
        "value": "Sax Soprano"
    },
    {
        "id": "48",
        "value": "Saxophone"
    },
    {
        "id": "121",
        "value": "Shakuhachi"
    },
    {
        "id": "111",
        "value": "Shamisen"
    },
    {
        "id": "122",
        "value": "Shwam"
    },
    {
        "id": "76",
        "value": "Sitar"
    },
    {
        "id": "49",
        "value": "Soloist"
    },
    {
        "id": "71",
        "value": "Songwriter"
    },
    {
        "id": "50",
        "value": "Soprano"
    },
    {
        "id": "51",
        "value": "Soprano Saxophone"
    },
    {
        "id": "72",
        "value": "String Bass"
    },
    {
        "id": "84",
        "value": "Suling"
    },
    {
        "id": "85",
        "value": "Synthesizer"
    },
    {
        "id": "52",
        "value": "Tabla"
    },
    {
        "id": "97",
        "value": "Taiko"
    },
    {
        "id": "98",
        "value": "Tamboura"
    },
    {
        "id": "99",
        "value": "Tambourine"
    },
    {
        "id": "86",
        "value": "Tape"
    },
    {
        "id": "53",
        "value": "Tenor"
    },
    {
        "id": "54",
        "value": "Tenor Saxophone"
    },
    {
        "id": "55",
        "value": "Trombone"
    },
    {
        "id": "56",
        "value": "Trumpet"
    },
    {
        "id": "73",
        "value": "Tuba"
    },
    {
        "id": "100",
        "value": "Tympania"
    },
    {
        "id": "57",
        "value": "Unkown"
    },
    {
        "id": "58",
        "value": "Vibraphone"
    },
    {
        "id": "112",
        "value": "Vina"
    },
    {
        "id": "113",
        "value": "Viol"
    },
    {
        "id": "59",
        "value": "Viola"
    },
    {
        "id": "60",
        "value": "Violin"
    },
    {
        "id": "61",
        "value": "Violin I"
    },
    {
        "id": "62",
        "value": "Violin II"
    },
    {
        "id": "63",
        "value": "Violincello"
    },
    {
        "id": "64",
        "value": "Vocal Group"
    },
    {
        "id": "65",
        "value": "Vocals"
    },
    {
        "id": "101",
        "value": "Xylophone"
    }
]
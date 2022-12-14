export const menuList: {
    key: string;
    text?: string;
    icon?: number;
}[] = [
        {
            key: "tracks",
            text: "Tracks",
            icon: 0,
        },
        {
            key: "albums",
            text: "Albums",
            icon: 0,
        }
    ];
export const tabMenuList: {
    key: string;
    text?: string;
}[] = [
        {
            key: "newtrack",
            text: "New Track",
        },
        {
            key: "showall",
            text: "Show All",
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
export const readingStatusOption = [
    { value: 'all', label: 'All' },
    { value: 'reading', label: 'Reading' },
    { value: 'onHold', label: 'On Hold' },
    { value: 'planToRead', label: 'Plan to Read' },
    { value: 'completed', label: 'Completed' },
    { value: 'dropped', label: 'Dropped' },
]

export const mangaStatusOption = [
    { value: 'unread', label: 'Unread' },
    { value: 'title', label: 'Title' },
    { value: 'released', label: 'Released' },
    { value: 'chapterReleased', label: 'Chapters Released' }
]

export const tagsOptions = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'comedy', label: 'Comedy' },
]

export const mangaList = [
    {
        id: 1,
        title: 'One Piece',
        readingStatus: 'reading',
        mangaStatus: 'unread',
        tags: ['action', 'adventure', 'comedy'],
        cover: 'https://'
    },
    {
        id: 2,
        title: 'One Punch-Man',
        readingStatus: 'reading',
        mangaStatus: 'unread',
        tags: ['action', 'slice of life', 'comedy'],
        cover: 'https://'
    },
    {
        id: 3,
        title: 'Super Cube',
        readingStatus: 'reading',
        mangaStatus: 'unread',
        tags: ['action', 'adventure', 'comedy'],
        cover: 'https://'
    },
]

//#649ecc
export const selectorStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? 'white'
                    : isFocused
                        ? '#d3e4f0'
                        : null,
            "&:hover":{
                backgroundColor: isDisabled
                    ? null
                        : isSelected
                            ? '#d3e4f0'
                            : null
            },
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? data.color
                        ? 'white'
                        : 'black'
                    : data.color
                        ? 'white'
                        : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    }
}
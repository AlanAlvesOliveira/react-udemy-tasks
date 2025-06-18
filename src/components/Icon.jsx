// Icon.jsx
export default function Icon({ type, size = 4, className = '', ...props }) {
    const icons = {
        'chevron-down': {
            label: 'Show more...',
            path: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
        },
        'chevron-up': {
            label: 'Show less',
            path: 'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
        },
        'plus': {
            lable: "Add",
            path: 'M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
        },
    };

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-${size} w-${size} ${className}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                {...props}
            >
                <path fillRule="evenodd" d={icons[type].path} clipRule="evenodd" />
            </svg>
            {icons[type].label}
        </>

    );
}

export const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23.498 6.186a3.003 3.003 0 0 0-2.107-2.107C19.5 4 12 4 12 4s-7.5 0-9.391.079A3.003 3.003 0 0 0 .502 6.186 30.078 30.078 0 0 0 0 12c.502 1.814 1.5 3.186 2.109 3.107C4.5 16 12 16 12 16s7.5 0 9.391-.079a3.003 3.003 0 0 0 2.107-2.107A30.078 30.078 0 0 0 24 12a30.078 30.078 0 0 0-.502-5.814zM9.545 15.25V8.75l6.455 3.25-6.455 3.25z"
                fill="currentColor"
            />
        </svg>
    );
};
// Skeleton.js
const Skeleton = ({ width, height, className }) => {
    return (
        <div
            className={`bg-gray-700 animate-pulse ${className}`} // Darker shade
            style={{
                width: width || '100%',
                height: height || '20px',
                backgroundImage: 'linear-gradient(90deg, #3d3d3d 25%, #555555 50%, #3d3d3d 75%)', // Dark gradient
                backgroundSize: '200% 100%', // Makes the pulse look cooler
                animation: 'pulse 1.5s ease-in-out infinite',
                borderRadius:'5px',
            }}
        />
    );
};

// Add the custom keyframes animation to your global CSS or within the component styles:
<style>
{`
@keyframes pulse {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
`}
</style>

export default Skeleton;

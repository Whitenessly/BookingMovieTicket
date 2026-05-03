import React from 'react';

const FAQ = () => {
    return (
        <div className='w-full min-h-screen text-white p-8 md:p-16 font-sans'>
            {/* Header Section */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6'>
                <div className='max-w-3xl'>
                    <h2 className='text-3xl font-bold mb-3'>Frequently Asked Questions</h2>
                    <p className='text-gray-400 text-sm'>
                        Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.
                    </p>
                </div>
            </div>

            
        </div>
    );
};


export default FAQ
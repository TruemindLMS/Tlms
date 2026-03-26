
import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        About <span className="text-primary">Talent Flow</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Empowering learners worldwide with quality education and skill development
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600 text-lg mb-4">
                            At Talent Flow, we believe that education should be accessible to everyone, everywhere.
                            Our mission is to provide high-quality, affordable learning opportunities that help
                            individuals build the skills they need to succeed in their careers and personal lives.
                        </p>
                        <p className="text-gray-600 text-lg">
                            With over 100 active students and 500+ expert instructors, we're building a
                            community of lifelong learners who are passionate about growth and development.
                        </p>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/img/stu.jpg"
                            alt="Our Mission"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-primary rounded-2xl p-12 text-center">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">100+</div>
                            <div className="text-blue-100">Active Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-blue-100">Expert Instructors</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">1,000+</div>
                            <div className="text-blue-100">Courses</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const values = [
    {
        icon: "🎓",
        title: "Quality Education",
        description: "We provide high-quality courses taught by industry experts"
    },
    {
        icon: "🌍",
        title: "Global Community",
        description: "Connect with learners from around the world"
    },
    {
        icon: "🚀",
        title: "Innovation",
        description: "Constantly evolving to meet the needs of modern learners"
    }
];
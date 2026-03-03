
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { BadFoodReport } from '../../types';
import Card from '../ui/Card';

const BadFoodReports: React.FC = () => {
    const { badFoodReports, students } = useAppContext();

    const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown Student';
    
    const sortedReports = [...badFoodReports].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Bad Food / Issue Reports</h2>
            <div className="space-y-4">
                {sortedReports.length > 0 ? sortedReports.map((report: BadFoodReport) => (
                    <Card key={report.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-lg text-red-700">{getStudentName(report.studentId)}</p>
                                <p className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString('en-CA')}</p>
                            </div>
                            <p className="text-sm text-gray-400">ID: {report.id}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-800 bg-red-50 p-3 rounded-md">{report.message}</p>
                        </div>
                    </Card>
                )) : (
                    <Card>
                        <p className="text-center text-gray-500 py-12">🎉 No issues have been reported. Great job!</p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BadFoodReports;

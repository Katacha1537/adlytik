import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

const CongratulationsCard = () => {
  return (
    <Card className="relative p-4 bg-white shadow-md rounded-lg max-w-sm mx-auto">
      <CardHeader className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800">Outstanding Achievement</h2>
        <p className="text-gray-600">Top Performer of the Month</p>
      </CardHeader>
      <CardBody className="flex justify-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explore Rewards
        </Button>
      </CardBody>
      <div className="absolute bottom-4 right-4">
        <h2>teste</h2>
      </div>
    </Card>
  );
};

export default CongratulationsCard;

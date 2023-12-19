import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

import Throph from '../assets/recompensa.png'

const CongratulationsCard = () => {
  return (
    <Card className="p-4 bg-content1 shadow-md rounded-lg mb-5 border-1 border-content3">
      <CardHeader className="flex flex-col">
        <h2 className="text-2xl font-bold text-foreground">Nova Conquista</h2>
        <p className="text-foreground-600">Melhor Perfomace da semana</p>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        <img src={Throph} className='w-28 mb-4'  />
        <Button className="bg-purple-500 text-white font-bold py-2 px-4 rounded min-w-[200px]">
          Explorar
        </Button>
      </CardBody>
      <CardFooter className="w-full justify-end">
      </CardFooter>
    </Card>
  );
};

export default CongratulationsCard;

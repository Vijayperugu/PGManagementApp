import React, { ReactNode, useState } from 'react';
import PgContext from './PgContext';
import pgData from './pgData';
import { BranchFormData } from '../pages/branch/schemas/brancSchema';
import { RoomDataFrom } from '../pages/branch/schemas/RoomSchema';
import { UserDataForm } from '../pages/branch/schemas/UserSchema';

interface PgProvideProps {
  children: ReactNode;
}

const PgProvide = ({ children }: PgProvideProps) => {
  const [branches, setBranches] = useState(pgData.branches)
  const [floors] = useState(pgData.floors);
  const [rooms, setRooms] = useState(pgData.rooms);
  const [members, setMembers] = useState(pgData.members);
  const [IsLogin ,setIsLogin]= useState(false)

  const getNextId = (items: { id: number }[]) => {
    return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
  };

  const addBranch = (branch: BranchFormData) => {
    setBranches(currentBranches => [
      ...currentBranches,
      {
        id: getNextId(currentBranches),
        name: branch.branchName,
        address: branch.address,
        totalFloors: 0,
        totalRooms: 0,
      },
    ]);
  };

  const addRoom = (branchId: number, room: RoomDataFrom) => {
    setRooms(currentRooms => [
      ...currentRooms,
      {
        id: getNextId(currentRooms),
        branchId,
        floorId: Number(room.floorNo) || 0,
        roomNo: room.roomNo,
        capacity: Number(room.NoOfMembers) || 0,
        occupied: 0,
        availableBeds: Number(room.NoOfMembers) || 0,
        rent: Number(room.rent) || 0,
        roomInfo: room.roomInfo,
        status: 'Available',
      },
    ]);
  };

  const addMember = (roomId: number, member: UserDataForm) => {
    const room = rooms.find(currentRoom => currentRoom.id === roomId);

    const newMember = {
      id: getNextId(members),
      branchId: room?.branchId || 0,
      floorId: room?.floorId || 0,
      roomId,
      name: member.name,
      age: Number(member.age) || 0,
      gender: 'Unknown',
      photoUri: member.photoUri || '',
      phone: member.PhoneNumber,
      email: '',
      address: member.Address,
      college: '',
      course: member.occupation,
      occupation: member.occupation,
      parentName: '',
      parentPhone: '',
      joiningDate: member.joiningDate,
      rent: 0,
      status: 'Active',
    };

    setMembers(currentMembers => [...currentMembers, newMember]);
  };

  const value = {
    branches,
    floors,
    rooms,
    members,
    addBranch,
    addRoom,
    addMember,
    IsLogin,
    setIsLogin
  };

  return (
    <PgContext.Provider value={value}>
      {children}
    </PgContext.Provider>
  );
};

export default PgProvide;

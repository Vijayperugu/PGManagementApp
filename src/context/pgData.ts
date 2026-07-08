const pgData = {
  branches: [
    {
      id: 1,
      name: "Gachibowl",
      address: "Benz Circle",
      totalFloors: 3,
      totalRooms: 12,
    },
    {
      id: 2,
      name: "Hitech City",
      address: "Brodipet",
      totalFloors: 2,
      totalRooms: 8,
    },
    {
      id: 3,
      name: "Gachibowl",
      address: "Benz Circle",
      phone: "9876543210",
      totalFloors: 3,
      totalRooms: 12,
    },
    {
      id: 4,
      name: "Hitech City",
      address: "Brodipet",
      phone: "9876543220",
      totalFloors: 2,
      totalRooms: 8,
    },
  ],

  floors: [
    {
      id: 1,
      branchId: 1,
      floorNo: 1,
      totalRooms: 4,
    },
    {
      id: 2,
      branchId: 1,
      floorNo: 2,
      totalRooms: 4,
    },
    {
      id: 3,
      branchId: 1,
      floorNo: 3,
      totalRooms: 4,
    },
    {
      id: 4,
      branchId: 2,
      floorNo: 1,
      totalRooms: 4,
    },
    {
      id: 5,
      branchId: 2,
      floorNo: 2,
      totalRooms: 4,
    },
  ],

  rooms: [
    {
      id: 1,
      branchId: 1,
      floorId: 1,
      roomNo: "101",
      capacity: 4,
      occupied: 2,
      availableBeds: 2,
      status: "Available",
    },
    {
      id: 2,
      branchId: 1,
      floorId: 1,
      roomNo: "102",
      capacity: 4,
      occupied: 4,
      availableBeds: 0,
      status: "Full",
    },
    {
      id: 3,
      branchId: 1,
      floorId: 2,
      roomNo: "201",
      capacity: 4,
      occupied: 1,
      availableBeds: 3,
      status: "Available",
    },
    {
      id: 4,
      branchId: 1,
      floorId: 2,
      roomNo: "202",
      capacity: 4,
      occupied: 0,
      availableBeds: 4,
      status: "Available",
    },
    {
      id: 5,
      branchId: 2,
      floorId: 4,
      roomNo: "101",
      capacity: 3,
      occupied: 2,
      availableBeds: 1,
      status: "Available",
    },
  ],

  members: [
    {
      id: 1,
      branchId: 1,
      floorId: 1,
      roomId: 1,

      name: "Rahul",
      age: 22,
      gender: "Male",
      photoUri: "https://i.pravatar.cc/200?img=12",

      phone: "9876543210",
      email: "rahul@gmail.com",
      address: "Benz Circle, Vijayawada",

      college: "VVIT",
      course: "B.Tech",
      occupation: "Student",

      parentName: "Ramesh",
      parentPhone: "9876500001",

      joiningDate: "2025-06-01",
      rent: 6000,

      status: "Active",
    },

    {
      id: 2,
      branchId: 1,
      floorId: 1,
      roomId: 1,

      name: "Kiran",
      age: 21,
      gender: "Male",
      photoUri: "https://i.pravatar.cc/200?img=15",

      phone: "9876543211",
      email: "kiran@gmail.com",
      address: "Benz Circle, Vijayawada",

      college: "KL University",
      course: "B.Tech",
      occupation: "Student",

      parentName: "Suresh",
      parentPhone: "9876500002",

      joiningDate: "2025-05-15",
      rent: 6000,

      status: "Active",
    },

    {
      id: 3,
      branchId: 1,
      floorId: 2,
      roomId: 3,

      name: "Arjun",
      age: 23,
      gender: "Male",
      photoUri: "https://i.pravatar.cc/200?img=33",

      phone: "9876543212",
      email: "arjun@gmail.com",
      address: "Brodipet, Guntur",

      college: "RVR",
      course: "MBA",
      occupation: "Student",

      parentName: "Mahesh",
      parentPhone: "9876500003",

      joiningDate: "2025-04-10",
      rent: 6500,

      status: "Active",
    },

    {
      id: 4,
      branchId: 2,
      floorId: 4,
      roomId: 5,

      name: "Vamsi",
      age: 24,
      gender: "Male",
      photoUri: "https://i.pravatar.cc/200?img=52",

      phone: "9876543213",
      email: "vamsi@gmail.com",
      address: "Hitech City, Hyderabad",

      college: "ANU",
      course: "MCA",
      occupation: "Student",

      parentName: "Ravi",
      parentPhone: "9876500004",

      joiningDate: "2025-02-20",
      rent: 5500,

      status: "Active",
    },
  ],
};

export default pgData;

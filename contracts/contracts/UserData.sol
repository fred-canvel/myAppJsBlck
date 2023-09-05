// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistration {
    struct UserData {
        string user;
        uint256 accountNumber;
        uint256 balance;
        string transactionType;
        uint256 amount;
        uint256 timestamp;
    }

    UserData[] public userRecords;

    function registerUser(
        string memory user,
        uint256 accountNumber,
        uint256 balance,
        string memory transactionType,
        uint256 amount,
        uint256 timestamp
    ) public {
        UserData memory newUser = UserData({
            user: user,
            accountNumber: accountNumber,
            balance: balance,
            transactionType: transactionType,
            amount: amount,
            timestamp: timestamp
        });

        userRecords.push(newUser);
    }

    function getUserRecordsCount() public view returns (uint256) {
        return userRecords.length;
    }

    function getUserRecord(uint256 index) public view returns (UserData memory) {
        require(index < userRecords.length, "Index out of bounds");
        return userRecords[index];
    }
}

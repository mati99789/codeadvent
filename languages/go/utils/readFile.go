package utils

import (
	"bufio"
	"os"
)

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func ReadFile(path string) []string {
	file, err := os.Open(path)
	checkError(err)
	defer file.Close()

	var data []string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		data = append(data, scanner.Text())
	}

	err = scanner.Err()
	checkError(err)
	return data
}

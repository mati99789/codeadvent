package main

import (
	"codeadvent/utils"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input := utils.ReadFile("./input.txt")

	var leftList []int
	var rightList []int

	for _, line := range input {
		numbers := strings.Fields(line)

		if len(numbers) == 2 {
			left, err := strconv.Atoi(numbers[0])
			if err != nil {
				panic(err)
			}

			right, err := strconv.Atoi(numbers[1])
			if err != nil {
				panic(err)
			}

			leftList = append(leftList, left)
			rightList = append(rightList, right)
		}
	}

	sort.Ints(leftList)
	sort.Ints(rightList)

	fmt.Println("leftList:", leftList)
	fmt.Println("rightList:", rightList)

	firstSolution := 0
	for i := 0; i < len(leftList); i++ {
		firstSolution += int(math.Abs(float64(leftList[i] - rightList[i])))
	}

	secondSolution := 0

	for i := 0; i < len(leftList); i++ {
		count := 0
		for j := 0; j < len(leftList); j++ {
			if leftList[i] == rightList[j] && leftList[i] != 0 {
				count++
			}
		}

		secondSolution += leftList[i] * count
	}
	fmt.Println("firstSolution:", firstSolution)
	fmt.Println("secondSolution:", secondSolution)
}

package solutions

import (
	"codeadvent/utils"
	"fmt"
	"strings"
)

func DayTwo() {
	input := utils.ReadFile("./input.txt")

	for _, s := range input {
		lines := strings.Fields(s)
		fmt.Println(lines)
	}
}

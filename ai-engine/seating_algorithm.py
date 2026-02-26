import random
from typing import List, Dict

class SeatingAlgorithm:
    def __init__(self, students: List[Dict], halls: List[Dict]):
        self.students = students
        self.halls = halls
        self.allocation = []

    def allocate(self):
        random.shuffle(self.students)
        student_idx = 0
        
        for hall in self.halls:
            if student_idx >= len(self.students):
                break
                
            hall_allocation = {
                'hallId': hall['id'],
                'hallName': hall['hallName'],
                'seats': []
            }
            
            grid = [[None for _ in range(hall['columns'])] for _ in range(hall['rows'])]
            positions = [(r, c) for r in range(hall['rows']) for c in range(hall['columns'])]
            random.shuffle(positions)
            
            for row, col in positions:
                if student_idx >= len(self.students):
                    break
                    
                student = self.students[student_idx]
                
                if self._is_valid_placement(grid, row, col, student):
                    grid[row][col] = student
                    hall_allocation['seats'].append({
                        'row': row + 1,
                        'column': col + 1,
                        'studentId': student['id'],
                        'registerNumber': student['registerNumber'],
                        'name': student['name'],
                        'department': student['department']
                    })
                    student_idx += 1
            
            if hall_allocation['seats']:
                self.allocation.append(hall_allocation)
        
        if student_idx < len(self.students):
            return self._retry_with_relaxed_constraints()
        
        return self.allocation

    def _is_valid_placement(self, grid, row, col, student):
        dept = student['department']
        reg_num = student['registerNumber']
        
        adjacent = [
            (row-1, col), (row+1, col), (row, col-1), (row, col+1),
            (row-1, col-1), (row-1, col+1), (row+1, col-1), (row+1, col+1)
        ]
        
        for r, c in adjacent:
            if 0 <= r < len(grid) and 0 <= c < len(grid[0]) and grid[r][c]:
                neighbor = grid[r][c]
                if neighbor['department'] == dept:
                    return False
                if self._is_consecutive_roll(reg_num, neighbor['registerNumber']):
                    return False
        
        return True

    def _is_consecutive_roll(self, reg1, reg2):
        try:
            num1 = int(''.join(filter(str.isdigit, reg1)))
            num2 = int(''.join(filter(str.isdigit, reg2)))
            return abs(num1 - num2) <= 2
        except:
            return False

    def _retry_with_relaxed_constraints(self):
        random.shuffle(self.students)
        self.allocation = []
        student_idx = 0
        
        for hall in self.halls:
            if student_idx >= len(self.students):
                break
                
            hall_allocation = {
                'hallId': hall['id'],
                'hallName': hall['hallName'],
                'seats': []
            }
            
            capacity = min(hall['capacity'], hall['rows'] * hall['columns'])
            for i in range(capacity):
                if student_idx >= len(self.students):
                    break
                    
                student = self.students[student_idx]
                row = i // hall['columns']
                col = i % hall['columns']
                
                hall_allocation['seats'].append({
                    'row': row + 1,
                    'column': col + 1,
                    'studentId': student['id'],
                    'registerNumber': student['registerNumber'],
                    'name': student['name'],
                    'department': student['department']
                })
                student_idx += 1
            
            if hall_allocation['seats']:
                self.allocation.append(hall_allocation)
        
        return self.allocation

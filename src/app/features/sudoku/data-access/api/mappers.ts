import { Board } from '../models/board';
import { BoardDTO } from './dto';

export const toDomainBoard = (dto: BoardDTO): Board => dto;
export const toBoardDTO = (board: BoardDTO): BoardDTO => board;

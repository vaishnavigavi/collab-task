import { Controller, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from '@collab-task/shared-models';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a comment to a task' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  addComment(
    @Param('taskId') taskId: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentsService.addComment(taskId, createCommentDto);
  }
} 
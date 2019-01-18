export const roles = {
  ORDINARY: 'attendee',
  AUTHOR: 'author',
  REVIEWER: 'reviewer',
  EDITOR: 'editor',
  CONF_ORGANIZER: 'organizer'
}

export const hasUserAnyRole = (userAttendance, ...requiredRoles) => {
  return userAttendance && userAttendance.some(attendance => requiredRoles.find(attendance.role));
}
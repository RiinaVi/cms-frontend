export const roles = {
  ORDINARY: 'O',
  AUTHOR: 'A',
  REVIEWER: 'R',
  EDITOR: 'E',
  CONF_ORGANIZER: 'C'
}

export const hasUserAnyRole = (userData, ...requiredRoles) => {
  return userData && requiredRoles.some(requireRole => userData.role.includes(requireRole));
}
import { StyleSheet } from "react-native";


export const brachStyle = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  homeScreen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  contianerTwo:{
    flex:1,
    padding:10
  },
  listContent: {
    padding: 16,
    paddingBottom: 110,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  searchInput: {
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
    fontSize: 15,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
  },
  tittle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
    fontSize: 15,
  },
  branchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  branchCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  branchInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  cardSubTitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cardStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  cardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 4,
  },
  cardStatText: {
    marginLeft: 5,
    color: '#4B5563',
    fontSize: 13,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  userListContent: {
    padding: 16,
    paddingBottom: 110,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  userPhoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5E7EB',
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  userMeta: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 8,
  },
  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  userDetailText: {
    flex: 1,
    marginLeft: 8,
    color: '#374151',
    fontSize: 13,
  },
  fab: {
  position: 'absolute',
  bottom: 25,
  right: 25,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#007AFF',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
},

  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalSheet: {
    height: '55%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
  userSheet: {
    height: '85%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },
})
